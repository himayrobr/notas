const express = require("express");
const noteRouters = require('./server/routers/noteRouters');
const userRouters = require('./server/routers/userRouters');
const error = require("./server/middleware/errorHandler");
const session = require("./server/middleware/sessionConfig");
const noteLimit = require('./server/middleware/noteLimit'); // Importa el middleware de limitación

const https = require("https");
const fs = require("fs");

const privateKey = fs.readFileSync('./private.key', 'utf8'); // Asegúrate del formato y ruta
const certificate = fs.readFileSync('./certificate.crt', 'utf8'); // Asegúrate del formato y ruta

const app = express();
app.use(express.json());
app.use(session);
app.use(error.jsonParseErrorHandler);

// Aplica el limitador de peticiones a las rutas de notas
app.use("/notes", noteLimit, noteRouters);
app.use("/users", userRouters);

app.post("/", (req, res) => {
  res.status(200).json(req.body);
});

// Configuración del servidor HTTPS
const options = {
  key: privateKey,
  cert: certificate,
  // Si la clave está cifrada, proporciona la frase de contraseña
   passphrase: 'serganimon', 
};

const config = {
  host: process.env.EXPRESS_HOST_NAME || 'localhost', // Valor por defecto
  port: process.env.EXPRESS_PORT || 5000, // Valor por defecto
};

console.log(`Host: ${config.host}, Port: ${config.port}`);

const httpsServer = https.createServer(options, app);

httpsServer.listen(config.port, config.host, () => {
  console.log(`Servidor HTTPS corriendo en https://${config.host}:${config.port}`);
});
