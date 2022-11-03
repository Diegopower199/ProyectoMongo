import { MongoClient} from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { CarSchema } from "./schemas.ts";

const env = config();

if (!env.MONGO_USR || !env.MONGO_PWD) {
    throw Error ("You need env vars MONGO_USR and MONGO_PWD")
}

const dbName = "Cabify";

const client = new MongoClient ();

await client.connect (
    `mongodb+srv://${env.MONGO_USR}:${env.MONGO_PWD}@cluster0.fkvpsms.mongodb.net/${dbName}?authMechanism=SCRAM-SHA-1`
);

const db = client.database(dbName);
console.info(`Mongo DB ${dbName} connected`);

export const CarsCollection = db.collection<CarSchema>("Cars");