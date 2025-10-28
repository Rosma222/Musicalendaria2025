const db = require("../models/app");

const guardarPlataformas = (usuarioId, { spotify, apple, tidal, ytmusic }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO plataformas (usuario_id, spotify, apple, tidal, ytmusic)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE spotify=VALUES(spotify), apple=VALUES(apple), tidal=VALUES(tidal), ytmusic=VALUES(ytmusic)`;
    db.query(sql, [usuarioId, spotify, apple, tidal, ytmusic], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const obtenerPlataformas = (usuarioId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT spotify, apple, tidal, ytmusic FROM plataformas WHERE usuario_id = ?";
    db.query(sql, [usuarioId], (err, results) => {
      if (err) reject(err);
      else resolve(results[0] || {});
    });
  });
};

module.exports = {
  guardarPlataformas,
  obtenerPlataformas
};
