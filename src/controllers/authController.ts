import { Request, Response } from "express";
import Usuario from "../models/User";
import { comparePassword, hashPassword } from "../services/passwordServices";
import { generateToken } from "../services/generarJWT";



export const register = async (req:Request, res:Response):Promise<void> => {

    const {email, password} = req.body;
    const usuario = new Usuario(email, password);

    try {
        usuario.password = await hashPassword(password);
        await usuario.save();
        res.status(200).json(usuario);

    } catch (error) {
       throw new Error('Error registering'); 
    }
};

export const login = async (req:Request, res:Response):Promise<void> => {
    const {email, password} = req.body

    try {
        const usuario  = await Usuario.findOne({email});
        if (!usuario) {
            res.status(400).json({msg:"user not found"});
            return;
        }

        const passMath = comparePassword(password, usuario!.password);
        if(!passMath){
            res.status(401).json({msg:"Credentials incorrect"});
            return
        }

        const token = generateToken(usuario.id);
        res.status(200).json({token});

    } catch (error) {
        throw new Error('Error login');
    }
};