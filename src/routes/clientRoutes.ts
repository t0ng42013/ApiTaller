import express from 'express';
import { createClient, getAllClient, getClient, updateClient } from '../controllers/clientController';
import { validarToken } from '../services/generarJWT';


const router = express.Router();
router.get('/',getAllClient )
router.post('/',createClient)
router.get('/client/:id', validarToken,getClient )
router.put('/client/:id',validarToken ,updateClient)

export default router