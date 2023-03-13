import passport from 'passport'
import local from "passport-local";
import usuarios from '../DB/models/usuarios.js'

const localStrategy= local.Strategy


passport.use('registro', new localStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true 
    }, async (req, nombre, password, done) => { 
        const usuarioMongo = await usuarios.findOne({ nombre });
        if (usuarioMongo) {
            return done(null, false, { message: 'El usuario ya existe' });
        }
        const nuevoUsuario = new usuarios();
        nuevoUsuario.nombre = nombre;
        nuevoUsuario.password = password;
        nuevoUsuario.correo= req.body.correo;
        nuevoUsuario.direccion=req.body.direccion;
        nuevoUsuario.edad=req.body.edad;
        nuevoUsuario.telefono=req.body.telefono;
        nuevoUsuario.imagen=req.body.imagen;
        await nuevoUsuario.save();
        return done(null, nuevoUsuario);
    }
));


passport.use('login', new localStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true 
    }, async (req, nombre, password, done) => { 
        const usuario = await usuarios.findOne({ nombre });
        if (!usuario) {
            return done(null, false, { message: 'El usuario no existe' });
        }
        if (usuario.password !== password) {
            return done(null, false, { message: 'La contraseña es incorrecta' });
        }
        return done(null, usuario);
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id); 
});

passport.deserializeUser(async (id, done) => {
    const usuario = await usuarios.findById(id);
    done(null, usuario);
});