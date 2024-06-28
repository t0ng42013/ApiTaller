import express from 'express';
import { createVehicle, getAllVehicles, getVehicles, updateVehicle } from '../controllers/vehiculoController';
import { validarToken } from '../services/generarJWT';

const router = express.Router();

router.get('/',validarToken, getAllVehicles);
router.post('/',validarToken, createVehicle);
router.get('/:id',validarToken, getVehicles);
router.put('/:id',validarToken, updateVehicle);

export default router;