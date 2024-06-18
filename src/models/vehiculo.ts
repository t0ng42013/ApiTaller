import { Schema, model } from "mongoose";
import { IVehiculo } from "../interface/IVehiculo";

const vehiculoSchema = new Schema({
    cliente:{type:Schema.Types.ObjectId, ref:'Client'},
    marca: { type:"string",required: true },
    model: { type:"string",required: true },
    year: { type:"number" ,required: true },
    km: { type:"number" ,required: true},
    patente: { type:"string" ,required: true}
});

const Vehiculo = model<IVehiculo>('Vehiculo',vehiculoSchema);
export default Vehiculo;