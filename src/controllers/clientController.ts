import {Request,Response} from 'express';
import Client from '../models/client';


export const getAllClient = async(req:Request, res:Response) =>{
    try {
        const clients = await Client.find();

        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createClient = async (req: Request, res: Response): Promise<void> => {
    const { nombre, apellido,monto_a_Pagar } = req.body;

    try {
        // Verificar si el cliente ya existe en la base de datos
        const existingClient = await Client.findOne({ nombre, apellido });

        if (existingClient) {
            res.status(409).json({ message: 'Cliente ya existe' });
            return 
        }

        // Si el cliente no existe, crear uno nuevo
        const newClient = new Client({
            nombre,
            apellido,
            monto_a_Pagar
            // Agregar aquí otros campos del cliente si los hubiera
        });

        // Guardar el nuevo cliente en la base de datos
        const clientSave = await newClient.save();

        // Devolver una respuesta con el cliente creado
        res.status(201).json(clientSave);

    } catch (error: any) {
        // Manejar errores de servidor
        res.status(500).json({ error: error.message });
    }
};

export const getClient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Buscar cliente por su ID en la base de datos
        const client = await Client.findById(id);

        // Verificar si se encontró el cliente
        if (!client) {
            res.status(404).json({ message: "Cliente no encontrado" });
            return 
        }

        // Devolver el cliente encontrado como respuesta
        res.status(200).json(client);
    } catch (error) {
        // Manejar errores de servidor
        console.error("Error fetching client:", error);
        res.status(500).json({ error: "Error fetching client" });
    }
};

export const updateClient = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {nombre, apellido, monto_a_Pagar} = req.body;
    try {

        let updateClient = await Client.findByIdAndUpdate(id,{
            nombre,apellido,monto_a_Pagar
        },{new:true});

        if (!updateClient) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return
        }
        res.status(200).json(updateClient);

    } catch (error) {
        console.log(error)
    }
}