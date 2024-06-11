import bcrypt from "bcrypt";

const SALT:number = 10;

export const hashPassword = async (password:string):Promise<string> =>{
    return await bcrypt.hash(password,SALT);
}

export const comparePassword = async (password:string, hash:string):Promise<boolean> =>{
    return await bcrypt.compare(password,hash);
};