import jwt from 'jsonwebtoken';
import { IUSer } from '../interface/IUser';
import { NextFunction, Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const generateToken = (usuario:IUSer):string => {
    try {
        return  jwt.sign({},JWT_SECRET!,{expiresIn:'4hs'});
    } catch (error) {
        throw new Error('Error generating token || env');
    }
};

export const validarToken = (req:Request, res:Response,next:NextFunction) => {

    //obtener el token
    const token = req.headers["x-token"] as string; 

    //verificar si hay token
    if (!token) {
        return res.status(401).json({message:"Invalid token"});
    }

    //verificar y decodificar el token
    jwt.verify(token,JWT_SECRET!,(err,decod)=>{
        if(err){
            return res.status(401).json({msj:"invalido o expirado"})
        }else{
            //token valido
            // req.user = decod
            next();
        }
    })
};