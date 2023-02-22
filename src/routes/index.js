import { Router } from 'express';
import passport from 'passport';
const router = Router();
import { fork } from 'child_process'
import core from 'os'
import log4js from 'log4js'




log4js.configure({
    appenders:{
        consola: { type: "console" },
        debugFile: { type: "file", filename: './debug.log'},
        warn:{type:"file",filename: './warn.log'},
        error:{type:"file",filename:'./error.log'} 
    },


    categories:{
        default:{
            appenders: ["consola"],
            level:"ALL"
        },
        dev:{
            appenders: ["consola"],
            level:"ALL"

        },
        prod:{
            error:{
                appenders: ["error"],
            level:"ERROR"
            },
            warn:{
                appenders: ["warn"],
            level:"WARN"
            },
            info:{appenders:["debugFile"],
            level: "INFO"}
        }
    }
})

const logger= log4js.getLogger('prod')


const info = [{
    "id": process.pid
}, {
    "Sistema operativo": process.platform
}, {
    "Version de node": process.version
}, {
    "directorio de ejecucion": process.cwd()
}, {
    "Memoria": process.memoryUsage()
}, {
    "Argumento de entrada": process.argv
},{
    "Cantidad de procesadores en el servidor": core.cpus().length
}]



function isAuth(req, res, next) {
    if (req.isAuthenticated()) { // Si esta autenticado sigue con la ejecucion que queremos
        return next();
    }
    res.redirect('/login');
}

router.get('/registro', (req, res) => {
    res.render('registrarse');
});

router.post('/registro', passport.authenticate('registro', {
    successRedirect: '/login',
    failureRedirect: '/errorRegistro',
}));

router.get('/home', isAuth, (req, res) => {
    res.render('home', {
        nombre: req.user.nombre
    });

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/errorLogin',
}));


router.get('/logout', (req, res) => {
    req.session.destroy(
        () => {
            res.render('login');
        }
    );
});

router.get('/', (req, res) => {
    res.redirect('login');
});

router.get('/errorRegistro', (req, res) => {
    
    res.render('errorRegistro');
});

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin');
    logger.error('Faltan Datos, o los que estan son incorrectos')
});

router.get('/info',(req,res)=>{
    logger.info(info)
res.send(info)
})


router.get("/randoms", (req, res) => {
    const cant = req.query.cant || 100000000;
    const Hijo = fork("./src/routes/randoms.js");
    Hijo.send(cant);
    Hijo.on("message", (msg) => {
      res.send(msg);
    });
  
    Hijo.on("exit", (code) => {
      console.log("Se ha cerrado el proceso", code);
    });
  });

  router.use(function(req, res, next) {
    logger.warn('La ruta seleccionada no existe')
    res.status(404).render('../views/rutaUndefined');
  });
  

export default router;