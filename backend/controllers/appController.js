const db = require("../models/app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "claveSecreta"; 

//  REGISTRO DE USUARIO (Artista o Admin)
const registrarUsuario = async (req, res) => {
  const { nombre, email, password, telefono, foto_url, rol} = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas de "salting"

    const sql = `
      INSERT INTO usuarios (nombre, email, password, telefono, foto_url, rol)
      VALUES (?, ?, ?, ?, ?, ?)`;

      // Solo permite "admin" si realmente se envía "admin"
    const rolFinal = (rol && rol.toLowerCase() === "admin") ? "admin" : "artista";
    
    db.query(sql, [nombre, email, hashedPassword, telefono, foto_url, rolFinal], (err, result) => {
      if (err) {
        console.error("Error al registrar usuario:", err);
        return res.status(500).json({ error: "Error al registrar usuario." });
      }

      res.status(201).json({ mensaje: "Usuario registrado correctamente." });
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// LOGIN DE USUARIO (Artista o Admin)
const loginUsuario = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const usuario = results[0];

    // Comparar la contraseña ingresada con la hash almacenada
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT con el rol
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensaje: "Login exitoso", token, rol: usuario.rol });
  });
};

module.exports = {
  registrarUsuario,
  loginUsuario
};
