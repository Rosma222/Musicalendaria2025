    const express = require("express");
    const bodyParser = require("body-parser");
    const cors = require("cors");

    const appRoutes = require("./routes/appRoutes");
    const artistaRoutes = require("./routes/artistaRoutes");  //router a artistas

    const app = express();
    const PORT = 3000;

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use("/", appRoutes);
    app.use("/api", artistaRoutes); // Montar rutas de artista bajo /api para coincidir con las llamadas del frontend

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    