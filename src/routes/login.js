import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});


router.post("/login", (req, res) => {
    const  { nombre }  = req.body;
    module.exports= nombre
    console.log(nombre);
  req.session.nombre = nombre
    if(!nombre){
        res.redirect('/login')
    }else{
        res.redirect("/");

    }
    
    


});

export default router