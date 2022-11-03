import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { CarsCollection } from "../db/database.ts";

type ReleaseCarContext = RouterContext<
  "/releaseCar/:id", {
    id:string
  }
  & Record<string | number, string | undefined>,
  Record<string, any>
>;

export const releaseCar = async (context: ReleaseCarContext) => {
    try {
      const plate = context.params?.id;
      const car = await CarsCollection.findOne({ plate });
  
      
  
      if (!car) {
        context.response.status = 404;
        context.response.body = {
          message: "Car not found",
        };
        return;
      }
  
      if (car) {
        if (car.free) {
          context.response.status = 400;
          context.response.body = {
            message: "Car already free",
          };
          return;
        } else {
          await CarsCollection.updateOne({ plate }, {
            $set: {
                free: true,
            }
          });
          context.response.status = 200;
        }
      }
    } catch (e) {
      console.error(e);
      context.response.status = 500;
    }
  };