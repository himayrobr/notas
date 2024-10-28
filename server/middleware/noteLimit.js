// server/middleware/noteLimit.js

const rateLimit = require('express-rate-limit');

// Configura el limitador de peticiones
const noteLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 peticiones por ventana
    message: 'Demasiadas peticiones, por favor intenta de nuevo más tarde.'
});

module.exports = noteLimit;
