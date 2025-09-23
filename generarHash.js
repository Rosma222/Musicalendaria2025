// generarHash.js
const bcrypt = require("bcrypt");

const password = "miclave"; // Acá poné la contraseña que querés
bcrypt.hash(password, 10).then(hash => {
  console.log("Contraseña cifrada:");
  console.log(hash);
});
