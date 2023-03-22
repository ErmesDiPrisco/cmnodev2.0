const express = require("express");
const app = express();
const router = express.Router();
const connectionDb = require("./db");
const bodyParser = require('body-parser');
const server = require("./server");
var Azienda = require("./models/aziendaModel");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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


router.get(`/azienda/:id`, (req, res) => {
  var id = req.params.id;
  connectionDb.query(
    `SELECT * FROM azienda WHERE id_azienda = '${id}' `,
    (err, result) => {
      if (err) {
        console.log(err);

      } else {
        res.send(result[0])


      }
    }
  );
});




router.post("/azienda/addAzienda", (req, res) => {
  var dati= req.body
  console.log(dati.nome)
  // connectionDb.query(
  //   `INSERT INTO azienda (id_azienda, nome, p_iva, indirizzo, cap, iban, telefono, email, pec, fax) \
  //   VALUE ('${id_azienda}','${nome}','${p_iva}','${indirizzo}','${cap}','${iban}','${telefono}','${email}','${pec}','${fax}')`,
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(result);
  //       res.send(result);

  //     }
  //   }
  // );
});


module.exports = router;