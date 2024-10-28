// server/middleware/sessionConfig.js
const session = require("express-session");

const sessionConfig = session({
    secret: 'your_secret_key', // Cambia esto a una clave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Cambia a true si estás usando HTTPS
        maxAge: 1000 * 60 * 60 // 1 hora
    }
});

module.exports = sessionConfig;
