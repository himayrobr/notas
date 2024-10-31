// app.js
const express = require("express");
const path = require("path");
require('dotenv').config(); // Para leer las variables del archivo .env

const connect = require('./server/helpers/connect');
const noteRouters = require('./server/routers/noteRouters');
const userRouters = require('./server/routers/userRouters');
const error = require("./server/middleware/errorHandler");
const session = require("./server/middleware/sessionConfig");
const noteLimit = require('./server/middleware/noteLimit');

// Conectar a MongoDB
connect();

// Crear instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware de sesiones
app.use(session);

// Middleware para manejar errores de JSON
app.use(error.jsonParseErrorHandler);

// Middleware de limitación de peticiones, aplicado a las rutas de notas
app.use("/api/notes", noteLimit, noteRouters);

// Rutas de usuarios
app.use("/api/users", userRouters);

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === 'production') {
  // Establecer carpeta estática
  app.use(express.static(path.join(__dirname, 'dist', 'client')));

  // Servir la aplicación de React para cualquier ruta no especificada
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'client', 'index.html'));
  });
} 

// Puerto y host
const PORT = process.env.EXPRESS_PORT || 5000;
const HOST = process.env.EXPRESS_HOST_NAME || 'localhost';

// Iniciar el servidor HTTP
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
});
