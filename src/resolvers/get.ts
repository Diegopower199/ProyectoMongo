import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { CarsCollection } from "../db/database.ts";

type AskCarContext = RouterContext<
  "/askCar",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const askCar = async (context: AskCarContext) => {
    try {
        const cars = await CarsCollection.find({ free: true }).toArray();
        if (cars.length > 0) {
            context.response.body = cars[0].plate;
            await CarsCollection.updateOne({ plate: cars[0].plate}, {
                $set: {
                    free: false,
                }
            })
        }
        else {
            context.response.status = 404;
            context.response.body = {
                message: "No available cars"
            };
        }
    }
    catch (e) {
        console.error(e);
        context.response.status = 500;
    }
}