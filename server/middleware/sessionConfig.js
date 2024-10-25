const session = require('express-session');
const fs = require("fs");

const SECRET_kEY = fs.readFileSync('./certificate.csr');
module.exports = session({
    secret: SECRET_kEY.toString('utf8'),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, maxAge:1800000}
});