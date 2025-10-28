const db = require("../models/app");

const guardarPortfolio = (usuarioId, url) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO portfolio (usuario_id, url) VALUES (?, ?) ON DUPLICATE KEY UPDATE url = VALUES(url)";
    db.query(sql, [usuarioId, url], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const obtenerPortfolio = (usuarioId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT url FROM portfolio WHERE usuario_id = ?";
    db.query(sql, [usuarioId], (err, results) => {
      if (err) reject(err);
      else resolve(results[0] || {});
    });
  });
};

module.exports = {
  guardarPortfolio,
  obtenerPortfolio
};
