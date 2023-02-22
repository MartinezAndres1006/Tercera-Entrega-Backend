import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})
export const AtlasMongo= process.env.mongoUrl


mongoose.set('strictQuery', false)
//  export const URL ='mongodb+srv://AndresMartinez:andres10062003@e-commerce.ejqa4yi.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(AtlasMongo, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("🔥 Conectado a la base de datos de mongo");
    }
  });