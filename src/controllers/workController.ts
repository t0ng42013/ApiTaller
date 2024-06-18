import { Request, Response } from "express";
import Work from "../models/work";


export const getAllWork = async(req:Request, res:Response)=>{
    try {
        const works = await Work.find();
        res.status(200).json(works);
    } catch (error) {
        console.log(error)
    }
};

export const createWork = async (req: Request, res: Response): Promise<void> => {
    const { cliente, description, tipo_trabajo, fecha, costo } = req.body;
    const { _id } = req.params;

    try {
        // Crear un nuevo trabajo asociado al vehículo identificado por _id
        const newWork = new Work({
            cliente,
            vehiculo: _id, // Asociar el trabajo al vehículo por su ID
            description,
            tipo_trabajo,
            fecha,
            costo
        });

        // Guardar el nuevo trabajo en la base de datos
        const workSave = await newWork.save();

        // Devolver una respuesta con el trabajo creado
        res.status(201).json(workSave);

    } catch (error) {
        // Manejar errores de servidor
        console.error("Error creating work:", error);
        res.status(500).json({ error: "Error creating work" });
    }
};
