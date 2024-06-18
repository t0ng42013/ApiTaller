import { Request, Response } from 'express';
import Client from '../models/client';
import Vehiculo from '../models/vehiculo';


export const createClientAndCard = async(req:Request,res_:Response):Promise<void> => {
    const {nombre,apellido,monto_a_Pagar,patente,marca,model,year,km} = req.body;

    try {
    const existingCar = await Vehiculo.findOne({patente});
        if (existingCar) {
            res_.status(409).json({msg:"El vehiculo ya existe en la base de datos"});
            return
        }

        const newClient = new Client({
            nombre,
            apellido,
            monto_a_Pagar
        });
        const clientSave = await newClient.save();
            

        const newVehicle = new Vehiculo({
            cliente:clientSave._id,
            marca,
            model,
            year,
            km
        });

        const VehicleSave = await newVehicle.save();
        res_.status(201).json({cliente: clientSave, vehiculo:VehicleSave});

    } catch (error:any) {
        res_.status(500).json({error:error.message});
    }
};