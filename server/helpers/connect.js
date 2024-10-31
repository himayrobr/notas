const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB, // Asegúrate de que esto apunte a la base de datos correcta
    });
    console.log(`Conectado a la base de datos: ${process.env.MONGO_DB}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    process.exit(1);
  }
};

module.exports = connectDB;
