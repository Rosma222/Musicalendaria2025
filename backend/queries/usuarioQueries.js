const db = require("../models/app");

const obtenerPerfil = (artistaId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT nombre, email, telefono, foto_url FROM usuarios WHERE id = ?";
    db.query(sql, [artistaId], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

const actualizarPerfil = (artistaId, { nombre, email, telefono, foto_url }) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, foto_url = ? WHERE id = ?";
    db.query(sql, [nombre, email, telefono, foto_url, artistaId], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const registrarUsuario = ({ nombre, email, hashedPassword, telefono, foto_url, rolFinal }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO usuarios (nombre, email, password, telefono, foto_url, rol)
      VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nombre, email, hashedPassword, telefono, foto_url, rolFinal], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const obtenerUsuarioPorEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

const obtenerTodosLosArtistas = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, nombre, email, telefono, foto_url FROM usuarios WHERE rol = 'artista'";
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const eliminarArtista = (artistaId) => {
  return new Promise((resolve, reject) => {
    const deleteQueries = [
      "DELETE FROM portfolio WHERE usuario_id = ?",
      "DELETE FROM plataformas WHERE usuario_id = ?",
      "DELETE FROM redes WHERE usuario_id = ?",
      "DELETE FROM eventos WHERE usuario_id = ?",
      "DELETE FROM usuarios WHERE id = ? AND rol = 'artista'"
    ];

    let completed = 0;
    const total = deleteQueries.length;
    let errors = [];

    deleteQueries.forEach((query, index) => {
      db.query(query, [artistaId], (err, result) => {
        if (err) errors.push(err);
        completed++;
        if (completed === total) {
          if (errors.length > 0) reject(errors);
          else resolve();
        }
      });
    });
  });
};

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
  registrarUsuario,
  obtenerUsuarioPorEmail,
  obtenerTodosLosArtistas,
  eliminarArtista
};
