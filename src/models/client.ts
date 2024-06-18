import { Schema, model } from "mongoose";
import { IClient } from "../interface/IClient";

const clientSchema = new Schema({
    nombre: { type: "string" },
    apellido:{ type: "string" },
    monto_a_Pagar:{ type: "number"}
});

const Client = model<IClient>('Client',clientSchema);
export default Client;