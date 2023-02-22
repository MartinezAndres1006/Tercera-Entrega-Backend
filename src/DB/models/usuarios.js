import mongoose from "mongoose";

 const UserSchema = new mongoose.Schema({
    nombre:String,
    correo:String,
    password:String
})

export default mongoose.model("usuarios",UserSchema)