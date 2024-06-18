import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';



export const generateToken = (id: string): string => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '4h' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Error generating token');
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
    jwt.verify(token,process.env.JWT_SECRET_KEY as string,(err,decod)=>{
        if(err){
            return res.status(401).json({msj:"invalido o expirado"})
        }else{
            //token valido
            // req.user = decod
            next();
        }
    })
};