const db = require("../models/app");

const crearEvento = (usuarioId, { fecha, lugar, modalidad, precio, link_entradas, flyer }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO eventos (usuario_id, fecha, lugar, modalidad, precio, link_entradas, flyer)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [usuarioId, fecha, lugar, modalidad, precio, link_entradas, flyer], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const obtenerEventos = (usuarioId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, fecha, lugar, modalidad, precio, link_entradas, flyer FROM eventos WHERE usuario_id = ? ORDER BY fecha DESC";
    db.query(sql, [usuarioId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const obtenerTodosLosEventos = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        e.flyer AS flyer_url,
        e.fecha,
        u.nombre AS artista,
        e.lugar,
        e.modalidad,
        e.precio,
        e.link_entradas
      FROM eventos e
      JOIN usuarios u ON e.usuario_id = u.id
      WHERE e.fecha >= CURDATE()
      ORDER BY e.fecha ASC
    `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  crearEvento,
  obtenerEventos,
  obtenerTodosLosEventos
};
