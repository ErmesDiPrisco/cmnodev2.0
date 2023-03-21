const express = require("express");
const app = express();
const router = express.Router();
const connectionDb = require("./db");
const server = require("./server");



router.get("/cliente", (req, res) => {
    connectionDb.query("SELECT * FROM cliente", (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        const cliente = rows;
        res.send(cliente);
        console.log(cliente);
      }
    });
  });


  router.get(`/cliente/:id`, (req, res) => {
    var id = req.params.id;
    connectionDb.query(
      `SELECT * FROM cliente WHERE id_cliente = '${id}' `,
      (err, result) => {
        if (err) {
          console.log(err);
    
        } else {
          console.log(result);
          res.send(result[0])
        }
      }
    );
  });

  module.exports = router;