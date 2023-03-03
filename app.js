import express from "express"
import session from 'express-session'
import passport from "passport";
import MongoStore from "connect-mongo"
import dotenv from 'dotenv'
import api from './src/routes/index.js'
import { AtlasMongo } from "./src/DB/db.js";
import './src/DB/models/usuarios.js'
import './src/passport/passportConfig.js'
import { modeServer,portServer } from "./src/passport/yargsconfig.js";
import cluster from "cluster";
import core from 'os'
dotenv.config({ path: './.env' })
import compression from "compression";

// Variables 
const clave = process.env.secret
const puerto = portServer || 8080
const mode = modeServer || "Fork"
const cpu = core.cpus().length

 

// Aca empieza la magia con el cluster
if (cluster.isPrimary && modeServer == 'cluster') {
    console.log(`Servidor corriendo en el puerto ${portServer}💻 en modo ${modeServer} con un processId ${process.pid}`);


    for (let i = 0; i < cpu; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()})
 

    

} else {
    const app = express()
    
    // compression
    // app.use(compression())

    app.listen(puerto, (req, res) => {
        console.log(`server up con un proceso ${process.pid} y su puerto ${puerto} en el modo ${mode}`);
    })


    app.use(session({
        secret: clave,
        resave: true,
        store: MongoStore.create({
            mongoUrl: AtlasMongo
        }),
        saveUninitialized: true
    }))


    // interacciones

    app.use(express.urlencoded({
        extended: true
    }));


    app.use(express.json())
    app.set('views', 'src/views')
    app.set('view engine', 'ejs')
    app.use(express.static('views'))
    app.use(express.static('public'))
    app.use(passport.initialize());
    app.use(passport.session());
    
    
   


    // rutas
    app.use('/', api);




}