    const express = require("express");
    const router = express.Router();
    const jwt = require("jsonwebtoken");
    const JWT_SECRET = "claveSecreta";
    const db = require("../models/app");
    const appController = require("../controllers/appController");
    const auth = require("../middleware/auth");
    

    // Ruta de prueba
    router.get("/", (req, res) => {
      res.send("API de Musicalendaria funcionando!");
    });

    // Ruta protegida solo para administradores
    router.get("/solo-admin", auth(["admin"]), (req, res) => {
      res.json({ mensaje: "¡Bienvenido, administrador!" });
    });

    // Ruta de login
    router.post("/login", appController.loginUsuario);

    // Ruta de register
    router.post("/registro", appController.registrarUsuario);

    module.exports = router;
    