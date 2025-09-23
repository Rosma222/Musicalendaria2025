const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",          // usuario de Uniform
  password: "1234",          // contraseña de root
  database: "musicalendaria" 
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL.");
});

module.exports = connection;
