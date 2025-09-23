// backend/middleware/auth.js
//Middleware para verificar el token JWT del usuario y extraer el ID.

const jwt = require("jsonwebtoken");
const JWT_SECRET = "claveSecreta"; 

module.exports = (roles = []) =>  {
  // roles puede ser un string o un array
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const authHeader = req.headers && req.headers.authorization;
    if (!authHeader) {
      console.error("No se proporcionó token en la cabecera");
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Error al verificar token:", err);
        return res.status(401).json({ error: "Token inválido" });
      }

      if (roles.length && !roles.includes(decoded.rol)) {
        console.error("Rol no autorizado:", decoded.rol);
        return res.status(403).json({ error: "No autorizado" });
      }

      console.log("Token verificado correctamente:", decoded);
      req.user = decoded; // Guarda los datos del usuario en la request
      next();
    });
  };
};
