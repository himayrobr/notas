// server/config/connect.js
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar las variables de entorno

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connect;
