import mongoose from "mongoose";

export interface IVehiculo {
    cliente?: mongoose.Schema.Types.ObjectId;
    marca: string;
    model: string;
    year: number;
    km: number;
    patente: string;
}