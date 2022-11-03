import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { removeCar } from "./resolvers/delete.ts";
import { askCar } from "./resolvers/get.ts";
import { addCar } from "./resolvers/post.ts";
import { releaseCar } from "./resolvers/put.ts";

const router = new Router ();

router.get("/test", (context) => {
    context.response.body = "Todo ok";
});

router.post("/addCar", addCar)
router.delete("/removeCar/:id", removeCar)
router.get("/askCar", askCar);
router.put("/releaseCar/:id", releaseCar);

const app = new Application ();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7778});