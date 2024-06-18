import express from 'express';
import { createVehicle, getAllVehicles } from '../controllers/vehiculoController';

const router = express.Router();

router.get('/', getAllVehicles);
router.post('/', createVehicle);
router.get('/:id', getAllVehicles);
router.put('/:id', getAllVehicles);