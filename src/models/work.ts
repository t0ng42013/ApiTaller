import { Schema, model } from "mongoose";
import { IWork } from "../interface/IWork";

const workSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref:'Client'},
    Vehiculo: { type: Schema.Types.ObjectId, ref:'Vehiculo' },
    description: { type:"string"},
    tipo_trabajo: { type:"string",required: true},
    fecha: { type:"string",required: true},
    costo: { type:"number"}
});

const Work = model<IWork>('Work', workSchema);
export default Work;