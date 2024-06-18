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

export const getWork = async(req:Request, res:Response)=>{
    const {id} = req.params;
    try {
        const work = await Work.findById(id);
        
        if(!work) {
            res.status(404).json({ error: "trabajo no enontrad0"});
            return
        }
        res.status(200).json(work);
    } catch (error) {
        console.log(error)
    }
}

export const updateWork = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {cliente,vehiculo,description,tipo_trabajo,fecha,costo} = req.body;
    try {
        let updateWork = await Work.findByIdAndUpdate(id,{
            cliente,vehiculo,description,tipo_trabajo,fecha,costo
        },{new:true});

        if(!updateWork){
            res.status(404).json({msg:"Trabajo no encontrado"})
            return
        }
        res.status(200).json(updateWork)
    } catch (error) {
        console.log(error)
    }
};

export const deleteWork = async(req:Request, res:Response)=>{
    const {id} = req.params;
    try {
        const deleteWork = await Work.findByIdAndDelete(id);
        if(!deleteWork){
            res.status(404).json({msg:"Trabajo no encontrado"})
            return
        }
        res.status(200).json({ msg: 'Trabajo eliminado correctamente' });
    } catch (error) {
        console.log(error)
    }
};