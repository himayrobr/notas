const express = require("express");
const path = require("path");
require('dotenv').config();
const connect = require('./server/helpers/connect');
const noteRouters = require('./server/routers/noteRouters');
const userRouters = require('./server/routers/userRouters');
const authRouters = require('./server/routers/authRouters'); 
const error = require("./server/middleware/errorHandler");
const session = require("./server/middleware/sessionConfig");
const noteLimit = require('./server/middleware/noteLimit');
const passport = require('./config/passport'); 
const cors = require('cors'); 

connect();

const app = express();

app.use(express.json());
app.use(cors()); 
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(error.jsonParseErrorHandler);
app.use("/api/notes", noteLimit, noteRouters);
app.use("/api/users", userRouters);
app.use("/auth", authRouters);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist', 'client')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'client', 'index.html'));
  });
}

const PORT = process.env.EXPRESS_PORT || 5000;
const HOST = process.env.EXPRESS_HOST_NAME || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
