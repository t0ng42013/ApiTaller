import express from 'express';
import { createVehicle, getAllVehicles, getVehicles, updateVehicle } from '../controllers/vehiculoController';

const router = express.Router();

router.get('/', getAllVehicles);
router.post('/', createVehicle);
router.get('/:id', getVehicles);
router.put('/:id', updateVehicle);

export default router;