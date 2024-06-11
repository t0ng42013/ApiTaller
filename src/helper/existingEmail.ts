import Usuario from "../models/User";

export const existingEmail = async(email:string) => {
    const EMAIL = await Usuario.findOne({ email});
    if(EMAIL){
        console.log(EMAIL)
        throw new Error(`El email ${email} already exists`);
    }
};