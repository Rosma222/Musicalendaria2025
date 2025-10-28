// backend/controllers/artistaController.js
    //funciones para manejar la lógica de cada endpoint

const jwt = require("jsonwebtoken");
const {
  obtenerPerfil: queryObtenerPerfil,
  actualizarPerfil: queryActualizarPerfil,
  obtenerTodosLosArtistas: queryObtenerTodosLosArtistas,
  eliminarArtista: queryEliminarArtista
} = require("../queries/usuarioQueries");
const { guardarPortfolio: queryGuardarPortfolio, obtenerPortfolio: queryObtenerPortfolio } = require("../queries/portfolioQueries");
const { guardarPlataformas: queryGuardarPlataformas, obtenerPlataformas: queryObtenerPlataformas } = require("../queries/plataformasQueries");
const { guardarRedes: queryGuardarRedes, obtenerRedes: queryObtenerRedes } = require("../queries/redesQueries");
const { crearEvento: queryCrearEvento, obtenerEventos: queryObtenerEventos, obtenerTodosLosEventos: queryObtenerTodosLosEventos } = require("../queries/eventosQueries");

    // Obtener datos del perfil del artista logueado
    const obtenerPerfil = async (req, res) => {
      try {
        const artistaId = req.user.id;
        const perfil = await queryObtenerPerfil(artistaId);
        if (!perfil) {
          return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.json(perfil);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        res.status(500).json({ error: "Error al obtener perfil" });
      }
    };

    // Actualizar información personal del artista
    const actualizarPerfil = async (req, res) => {
      try {
        const artistaId = req.user.id;
        const { nombre, email, telefono, foto_url } = req.body;
        await queryActualizarPerfil(artistaId, { nombre, email, telefono, foto_url });
        res.json({ mensaje: "Perfil actualizado correctamente" });
      } catch (err) {
        console.error("Error al actualizar perfil:", err);
        res.status(500).json({ error: "Error al actualizar perfil" });
      }
    };

    // Portfolio
    const guardarPortfolio = async (req, res) => {
      try {
        const usuarioId = req.user.id;
        const { url } = req.body;
        await queryGuardarPortfolio(usuarioId, url);
        res.json({ mensaje: "Portfolio guardado correctamente" });
      } catch (err) {
        res.status(500).json({ error: "Error al guardar portfolio" });
      }
    };

    const obtenerPortfolio = async (req, res) => {
      try {
        const usuarioId = req.user.id;
        const portfolio = await queryObtenerPortfolio(usuarioId);
        res.json(portfolio);
      } catch (err) {
        res.status(500).json({ error: "Error al obtener portfolio" });
      }
    };

    // Plataformas
    const guardarPlataformas = async (req, res) => {
      try {
        const usuarioId = req.user.id;
        const { spotify, apple, tidal, ytmusic } = req.body;
        await queryGuardarPlataformas(usuarioId, { spotify, apple, tidal, ytmusic });
        res.json({ mensaje: "Plataformas guardadas correctamente" });
      } catch (err) {
        res.status(500).json({ error: "Error al guardar plataformas" });
      }
    };

    const obtenerPlataformas = async (req, res) => {
      try {
        const usuarioId = req.user.id;
        const plataformas = await queryObtenerPlataformas(usuarioId);
        res.json(plataformas);
      } catch (err) {
        res.status(500).json({ error: "Error al obtener plataformas" });
      }
    };

    // Redes
    const guardarRedes = async (req, res) => {
      try {
        const usuarioId = req.user.id;
        const { youtube, instagram } = req.body;
        await queryGuardarRedes(usuarioId, { youtube, instagram });
        res.json({ mensaje: "Redes guardadas correctamente" });
      } catch (err) {
        res.status(500).json({ error: "Error al guardar redes" });
      }
    };

    const obtenerRedes = async (req, res) => {
      try {
        const usuarioId = req.user.id;
        const redes = await queryObtenerRedes(usuarioId);
        res.json(redes);
      } catch (err) {
        res.status(500).json({ error: "Error al obtener redes" });
      }
    };

    // Eventos
    const crearEvento = async (req, res) => {
      try {
        const usuarioId = req.user.id;
        const { fecha, lugar, modalidad, precio, link_entradas, flyer } = req.body;
        console.log("Crear evento llamado con datos:", req.body); // Para depuración
        console.log("Usuario ID:", usuarioId); // Para depuración
        await queryCrearEvento(usuarioId, { fecha, lugar, modalidad, precio, link_entradas, flyer });
        res.json({ mensaje: "Evento creado correctamente" });
      } catch (err) {
        res.status(500).json({ error: "Error al crear evento" });
      }
    };

    const obtenerEventos = async (req, res) => {
      try {
        const usuarioId = req.user.id;
        const eventos = await queryObtenerEventos(usuarioId);
        res.json(eventos);
      } catch (err) {
        res.status(500).json({ error: "Error al obtener eventos" });
      }
    };

    // Obtener todos los eventos públicos (sin autenticación)
    const obtenerTodosLosEventos = async (req, res) => {
      try {
        const eventos = await queryObtenerTodosLosEventos();
        res.json(eventos);
      } catch (err) {
        console.error("Error al obtener todos los eventos:", err);
        res.status(500).json({ error: "Error al cargar los espectáculos" });
      }
    };

// Obtener todos los artistas (solo para admin)
const obtenerTodosLosArtistas = async (req, res) => {
  try {
    const artistas = await queryObtenerTodosLosArtistas();
    res.json(artistas);
  } catch (err) {
    console.error("Error al obtener artistas:", err);
    res.status(500).json({ error: "Error al obtener artistas" });
  }
};

// Eliminar artista (solo para admin)
const eliminarArtista = async (req, res) => {
  try {
    const artistaId = req.params.id;
    await queryEliminarArtista(artistaId);
    res.json({ mensaje: "Artista eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar artista:", err);
    res.status(500).json({ error: "Error al eliminar artista" });
  }
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
      obtenerTodosLosEventos,
      obtenerTodosLosArtistas,
      eliminarArtista
    };
