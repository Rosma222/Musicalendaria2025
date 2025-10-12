    // backend/routes/artistaRoutes.js
    //define las rutas HTTP que el frontend usará.

    const express = require("express");
    const router = express.Router();
    const jwt = require("jsonwebtoken");
    const JWT_SECRET = "claveSecreta";
    const db = require("../models/app");
    const artistaController = require("../controllers/artistaController");
    const auth = require("../middleware/auth"); 


// Rutas protegidas
router.get("/artista/perfil", auth(), artistaController.obtenerPerfil); // Agregado /api/artista/ y llamado a authMiddleware como función
router.put("/artista/perfil", auth(), artistaController.actualizarPerfil); // Agregado /api/artista/ y llamado a authMiddleware como función

// Portfolio
router.post("/artista/portfolio", auth(), artistaController.guardarPortfolio);
router.get("/artista/portfolio", auth(), artistaController.obtenerPortfolio);

// Plataformas
router.post("/artista/plataformas", auth(), artistaController.guardarPlataformas);
router.get("/artista/plataformas", auth(), artistaController.obtenerPlataformas);

// Redes
router.post("/artista/redes", auth(), artistaController.guardarRedes);
router.get("/artista/redes", auth(), artistaController.obtenerRedes);

// Eventos
router.post("/artista/eventos", auth(), artistaController.crearEvento);
router.get("/artista/eventos", auth(), artistaController.obtenerEventos);

// Ruta pública para obtener todos los espectáculos (para el frontend)
router.get("/espectaculos", artistaController.obtenerTodosLosEventos);


    module.exports = router;
    
