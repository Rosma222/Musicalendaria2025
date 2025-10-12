// backend/controllers/artistaController.js
    //funciones para manejar la lógica de cada endpoint

    const db = require("../models/app");
    const jwt = require("jsonwebtoken");

    // Obtener datos del perfil del artista logueado
    const obtenerPerfil = (req, res) => {
      const artistaId = req.user.id;

      // 'usuarios'
      const sql = "SELECT nombre, email, telefono, foto_url FROM usuarios WHERE id = ?";
      db.query(sql, [artistaId], (err, results) => {
        if (err) {
          console.error("Error al obtener perfil:", err); // para depuración
          return res.status(500).json({ error: "Error al obtener perfil" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.json(results[0]);
      });
    };

    // Actualizar información personal del artista
    const actualizarPerfil = (req, res) => {
      const artistaId = req.user.id;
      const { nombre, email, telefono, foto_url } = req.body;
      const sql = "UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, foto_url = ? WHERE id = ?";
      db.query(sql, [nombre, email, telefono, foto_url, artistaId], (err, result) => {
        if (err) {
          console.error("Error al actualizar perfil:", err); // Agregado para depuración
          return res.status(500).json({ error: "Error al actualizar perfil" });
        }
        res.json({ mensaje: "Perfil actualizado correctamente" });
      });
    };

    // Portfolio
    const guardarPortfolio = (req, res) => {
      const usuarioId = req.user.id;
      const { url } = req.body;
      db.query(
        "INSERT INTO portfolio (usuario_id, url) VALUES (?, ?) ON DUPLICATE KEY UPDATE url = VALUES(url)",
        [usuarioId, url],
        (err) => {
          if (err) return res.status(500).json({ error: "Error al guardar portfolio" });
          res.json({ mensaje: "Portfolio guardado correctamente" });
        }
      );
    };

    const obtenerPortfolio = (req, res) => {
      const usuarioId = req.user.id;
      db.query(
        "SELECT url FROM portfolio WHERE usuario_id = ?",
        [usuarioId],
        (err, results) => {
          if (err) return res.status(500).json({ error: "Error al obtener portfolio" });
          res.json(results[0] || {});
        }
      );
    };

    // Plataformas
    const guardarPlataformas = (req, res) => {
      const usuarioId = req.user.id;
      const { spotify, apple, tidal, ytmusic } = req.body;
      db.query(
        `INSERT INTO plataformas (usuario_id, spotify, apple, tidal, ytmusic)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE spotify=VALUES(spotify), apple=VALUES(apple), tidal=VALUES(tidal), ytmusic=VALUES(ytmusic)`,
        [usuarioId, spotify, apple, tidal, ytmusic],
        (err) => {
          if (err) return res.status(500).json({ error: "Error al guardar plataformas" });
          res.json({ mensaje: "Plataformas guardadas correctamente" });
        }
      );
    };

    const obtenerPlataformas = (req, res) => {
      const usuarioId = req.user.id;
      db.query(
        "SELECT spotify, apple, tidal, ytmusic FROM plataformas WHERE usuario_id = ?",
        [usuarioId],
        (err, results) => {
          if (err) return res.status(500).json({ error: "Error al obtener plataformas" });
          res.json(results[0] || {});
        }
      );
    };

    // Redes
    const guardarRedes = (req, res) => {
      const usuarioId = req.user.id;
      const { youtube, instagram } = req.body;
      db.query(
        `INSERT INTO redes (usuario_id, youtube, instagram)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE youtube=VALUES(youtube), instagram=VALUES(instagram)`,
        [usuarioId, youtube, instagram],
        (err) => {
          if (err) return res.status(500).json({ error: "Error al guardar redes" });
          res.json({ mensaje: "Redes guardadas correctamente" });
        }
      );
    };

    const obtenerRedes = (req, res) => {
      const usuarioId = req.user.id;
      db.query(
        "SELECT youtube, instagram FROM redes WHERE usuario_id = ?",
        [usuarioId],
        (err, results) => {
          if (err) return res.status(500).json({ error: "Error al obtener redes" });
          res.json(results[0] || {});
        }
      );
    };

    // Eventos
    const crearEvento = (req, res) => {
      const usuarioId = req.user.id;
      const { fecha, lugar, modalidad, precio, link_entradas, flyer } = req.body;
      console.log("Crear evento llamado con datos:", req.body); // Para depuración
      console.log("Usuario ID:", usuarioId); // Para depuración
      db.query(
        `INSERT INTO eventos (usuario_id, fecha, lugar, modalidad, precio, link_entradas, flyer)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [usuarioId, fecha, lugar, modalidad, precio, link_entradas, flyer],
        (err) => {
          if (err) return res.status(500).json({ error: "Error al crear evento" });
          res.json({ mensaje: "Evento creado correctamente" });
        }
      );
    };


    const obtenerEventos = (req, res) => {
      const usuarioId = req.user.id;
      db.query(
        "SELECT id, fecha, lugar, modalidad, precio, link_entradas, flyer FROM eventos WHERE usuario_id = ? ORDER BY fecha DESC",
        [usuarioId],
        (err, results) => {
          if (err) return res.status(500).json({ error: "Error al obtener eventos" });
          res.json(results);
        }
      );
    };

    // Obtener todos los eventos públicos (sin autenticación)
const obtenerTodosLosEventos = (req, res) => {
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
    if (err) {
      console.error("Error al obtener todos los eventos:", err);
      return res.status(500).json({ error: "Error al cargar los espectáculos" });
    }
    res.json(results);
  });
};

    module.exports = {
      obtenerPerfil,
      actualizarPerfil,
      guardarPortfolio,
      obtenerPortfolio,
      guardarPlataformas,
      obtenerPlataformas,
      guardarRedes,
      obtenerRedes,
      crearEvento,
      obtenerEventos,
      obtenerTodosLosEventos
    };
