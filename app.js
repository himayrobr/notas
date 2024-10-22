const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Importa MySQL
require('dotenv').config(); // Esto carga las variables de tu archivo .env


// Importar routers
const doctorRouter = require('./server/router/doctorRouter');
const pacienteRouter = require('./server/router/pacienteRouter');
const hospitalRouter = require('./server/router/hospitalRouter');
const cuentaRouter = require('./server/router/cuentaRouter');
const avisoRouter = require('./server/router/avisoRouter');

const app = express();

// Habilitar CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto si tu frontend corre en otro puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Si necesitas enviar cookies o autenticación
}));

// Configurar las rutas
app.use("/doctor", doctorRouter);
app.use("/paciente", pacienteRouter);
app.use("/hospital", hospitalRouter);
app.use("/cuenta", cuentaRouter);  // Cambiado a /cuenta
app.use("/aviso", avisoRouter);    // Cambiado a /aviso

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: "La API que deseas solicitar no está disponible" });
});

// Configuración de la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto según tu configuración
  user: 'root', // Cambia esto si tu usuario es diferente
  password: 'serganimonDzoro1', // Tu contraseña
  database: 'hospital' // El nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL como id ' + connection.threadId);
});

// Configuración del puerto y puesta en marcha del servidor
const PORT = 5000; // Puerto por defecto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`); // Asegúrate de que esto sea correcto
});
