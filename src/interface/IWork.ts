import mongoose from "mongoose";

export interface IWork {
    cliente?: mongoose.Schema.Types.ObjectId;
    vehiculo: mongoose.Schema.Types.ObjectId;
    description?: string;
    tipo_trabajo: string;
    fecha: string;
    costo?: number;
}