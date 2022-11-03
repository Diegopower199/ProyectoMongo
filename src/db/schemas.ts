import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // Para que esto me funcione debo ir a settings, buscar deno e ir a import map y poner lo siguiente ./import-map.json que es donde esta mongo
import {Car} from "../types.ts";

export type CarSchema = Car & {_id: ObjectId };