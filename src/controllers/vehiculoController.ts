import { Request, Response } from "express";
import Vehiculo from "../models/vehiculo";

export const getAllVehicles = async(req:Request, res:Response) => {
    try {
        const vehicle = await Vehiculo.find();
        res.status(200).json(vehicle);
    } catch (error) {
        console.log(error)
    }
};

export const createVehicle = async(req:Request,res:Response):Promise<void> => {
    const {marca,model,year,km,patente}= req.body;
    const {_id} = req.params;
    
    try {
        const existingCar = await Vehiculo.findOne({patente});
        if (existingCar) {
             res.status(409).json({message:"El vehiculo ya existe"});
             return;
        }

        
        const newVehicle = new Vehiculo({
            cliente: _id,
            marca,
            model,
            year,
            km,
            patente
        });
        const vehicleSave = await newVehicle.save();
        res.status(200).json(vehicleSave);

    } catch (error:any) {
        res.status(500).json({ error: error.message });
        throw new Error(error.message);
    }
};