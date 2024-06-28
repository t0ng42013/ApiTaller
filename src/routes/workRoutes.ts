import express from 'express';
import { createWork, deleteWork, getAllWork, getWork, updateWork } from '../controllers/workController';
import { validarToken } from '../services/generarJWT';

const router = express.Router();


router.get('/',validarToken, getAllWork);
router.post('/',validarToken, createWork);
router.get('/:id',validarToken,getWork );
router.put('/:id',validarToken, updateWork);
router.delete('/:id',validarToken, deleteWork);

export default router;