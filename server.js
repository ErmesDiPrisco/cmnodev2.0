const connectionDb = require('./db');
const express = require("express");
const azienda = require('./azienda');
const app = express();
const porta = 3000;
const router = express.Router();

app.listen(porta, () => {
    console.log("server avviato sulla porta " + porta);
  })

app.use("/", azienda)

