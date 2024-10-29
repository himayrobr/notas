const express = require("express");
const https = require("https");
const fs = require("fs");
const connect = require('./server/helpers/connect');
const noteRouters = require('./server/routers/noteRouters');
const userRouters = require('./server/routers/userRouters');
const error = require("./server/middleware/errorHandler");
const session = require("./server/middleware/sessionConfig");
const noteLimit = require('./server/middleware/noteLimit');
require('dotenv').config(); // Para leer las variables del archivo .env

// Leer las claves y certificados SSL
const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./certificate.crt', 'utf8');

// Crear instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware de sesiones
app.use(session);

// Middleware para manejar errores de JSON
app.use(error.jsonParseErrorHandler);

// Middleware de limitación de peticiones, aplicado a las rutas de notas
app.use("/notes", noteLimit, noteRouters);

// Rutas de usuarios
app.use("/users", userRouters);

// Ruta de prueba
app.post("/", (req, res) => {
  res.status(200).json(req.body);
});

// Conexión a MongoDB usando el archivo connect.js
connect();

// Configuración del servidor HTTPS
const options = {
  key: privateKey,
  cert: certificate,
  passphrase: 'serganimon'
};

const config = {
  host: process.env.EXPRESS_HOST_NAME || 'localhost',
  port: process.env.EXPRESS_PORT || 5000
};

console.log(`Host: ${config.host}, Port: ${config.port}`);

const httpsServer = https.createServer(options, app);

// Iniciar el servidor HTTPS
httpsServer.listen(config.port, config.host, () => {
  console.log(`Servidor HTTPS corriendo en https://${config.host}:${config.port}`);
});
