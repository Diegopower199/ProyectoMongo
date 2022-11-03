import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { CarsCollection } from "../db/database.ts";

type addCarContext = RouterContext<
  "/addCar",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const addCar = async (context: addCarContext) => {
  try {
    const body = context.request.body({ type: "json" });
    const value = await body.value;

    if (!value.plate || !value.seats) {
      context.response.status = 400;
      context.response.body = {
        message: "You need to provide plate and seats",
      };
      return;
    }

    const found = await CarsCollection.findOne({ plate: value.plate });

    if (found) {
      context.response.status = 400;
      context.response.body = {
        message: "Car already in the DDBB",
      };
      return;
    }

    await CarsCollection.insertOne({
      ...value,
      free: true,
    });

    context.response.body = {
      ...value,
      free: true,
    };
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};
