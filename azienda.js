const express = require("express");
const app = express();
const connectionDb = require("./db");
const server = require("./server");
const router = express.Router();
// var Azienda = require("./models/aziendaModel");
var id = "ciao";

router.get("/", (req, res) => {
  connectionDb.query("SELECT * FROM azienda", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      const aziende = rows;
      res.send(aziende);
    }
  });
});


// router.get(`/azienda/:id`, (req, res) => {
//      connectionDb.query(`SELECT * FROM azienda WHERE id_azienda = '${id}' `,(err, res) => {
//             if(err) {
//                return console.log(err);
//           } else {

//                 console.log(res)

//             }
//         })});

module.exports = router;
