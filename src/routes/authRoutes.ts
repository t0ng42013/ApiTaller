import express from 'express';
import { login, register } from '../controllers/authController';
import { check } from 'express-validator';
import { existingEmail } from '../helper/existingEmail';
import { errores } from '../helper/errores';


const router = express.Router();

router.post('/register',[
    
    check("password","El password es obligatorio").isLength({min:6}),
    check("email").custom(existingEmail),
    errores
],register);

router.post('/login',[
    check("email","El email es obligatorio").isEmail(),
    check("password","El password es obligatorio").isLength({min:6}),
    errores
],login);


export default router;