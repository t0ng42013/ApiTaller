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

export const getVehicles = async(req:Request, res:Response):Promise<void> =>{
    const{id} = req.params;
    try {
        const vehicle = await Vehiculo.findById(id);
        if(!vehicle){
            res.status(404).json({ message:"El vehiculo no se encontro"});
            return
        }
        res.status(200).json(vehicle);
    } catch (error) {
        console.log(error);
    }
};

export const updateVehicle = async (req: Request, res: Response) => {
    const{id}= req.params;
    const {cliente,marca,model,year,km,patente}= req.body;

    try {
        let updateVehicle = await Vehiculo.findByIdAndUpdate(id,{
            cliente,
            marca,
            model,
            year,
            km,
            patente
        },{new:true})

        if(!updateVehicle){
            res.status(404).json({msg:"vehiculo no encontrado"})
            return
        }
        res.status(200).json(updateVehicle)

    } catch (error) {
        console.log(error)
    }
};