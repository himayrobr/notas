// server/config/connect.js
const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error);
        process.exit(1);
    }
};

module.exports = connect;
