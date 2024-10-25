const express = require("express")
const noteRouters = require('./server/routers/noteRouters')
const userRouters = require('./server/routers/userRouters')
const error = require("./midldleware/errorHandler")
const session = require("./middleware/sessionConfig")

const https = require("https")
const fs = require("fs")

const privateKey = fs.readFileSync('./private.key');
const certificate = fs.readFileSync('./certificate.crt');
const app = express();

app.use(express.json());
app.use(session)
app.use(error.jsonParseErrorHandler);

app.use("/users", userRouters);
app.use("/notes", noteRouters);


app.post("/", (req, res)=>{
  res.status(200).json(req.body);
})

const httpsServer = https.createServer({
  key: privateKey,
  cert: certificate,
}, app);
const config = {
  host: process.env.ESPRESS_HOST,
  port: process.env.ESPRESS_PORT
}
httpsServer.listen(config, ()=>{
  console.log(`https://${config.host}:${config.port}`);
})