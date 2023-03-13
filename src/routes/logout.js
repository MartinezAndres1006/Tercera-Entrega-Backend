import { Router } from "express";

const router = Router();

router.get("/logout", (req, res) => {
    const nombre = req.session.nombre;
    res.render("logout", { nombre });
    req.session.destroy((err) => {
    if (!err) { 
       console.log("Session destruida");
     } else {
       res.send({ status: "Error al borrar session" });
    }
  });  
});


export default router