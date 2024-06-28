import express from 'express';
import { createClient, getAllClient, getClient, updateClient } from '../controllers/clientController';
import { validarToken } from '../services/generarJWT';


const router = express.Router();
router.get('/',validarToken,getAllClient )
router.post('/',validarToken,createClient)
router.get('/:id', validarToken,getClient )
router.put('/:id',validarToken ,updateClient)

export default router