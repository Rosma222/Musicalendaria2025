const db = require("../models/app");

const guardarRedes = (usuarioId, { youtube, instagram }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO redes (usuario_id, youtube, instagram)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE youtube=VALUES(youtube), instagram=VALUES(instagram)`;
    db.query(sql, [usuarioId, youtube, instagram], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const obtenerRedes = (usuarioId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT youtube, instagram FROM redes WHERE usuario_id = ?";
    db.query(sql, [usuarioId], (err, results) => {
      if (err) reject(err);
      else resolve(results[0] || {});
    });
  });
};

module.exports = {
  guardarRedes,
  obtenerRedes
};
