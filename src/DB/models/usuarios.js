import mongoose from "mongoose";

 const UserSchema = new mongoose.Schema({
    nombre:String,
    telefono:String,
    direccion:String,
    edad:String,
    correo:String,
    password:String,
    imagen:String
    
})

export default mongoose.model("usuarios",UserSchema)