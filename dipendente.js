const express = require("express");
const app = express();
const router = express.Router();
const connectionDb = require("./db");
const server = require("./server");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/dipendente", (req, res) => {
    connectionDb.query("SELECT * FROM dipendente", (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        const dipendente = rows;
        res.send(dipendente);
        console.log(dipendente);
      }
    });
  });


  router.get(`/dipendente/:id`, (req, res) => {
    var id = req.params.id;
    connectionDb.query(
      `SELECT * FROM dipendente WHERE id_dipendente = '${id}' `,
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