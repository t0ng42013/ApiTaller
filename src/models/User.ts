import { Schema, model } from "mongoose";
import { IUSer } from "../interface/IUser";

const UserSchema = new Schema({
    nombre: { type:"string", required:[true,"required"] },
    email:{type:"string", required:[true,"required"]},
    password:{type:"string", required:[true,"required"]},
    code:{type:"string"}
});

UserSchema.methods.toJson = function(){
    const {__v,password,_id,code,...usuario} = this.toObject();
    return usuario;
}

const Usuario = model<IUSer>('Usuario',UserSchema);
export default Usuario;