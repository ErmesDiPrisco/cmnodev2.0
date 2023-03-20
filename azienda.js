const express = require("express");
const app = express();
const connectionDb = require("./db");
const server= require('./server')
const router = express.Router();
var Azienda = require('./models/aziendaModel')
var id = 'ciao'

// const getAllCompanies = connectionDb.query('select * from azienda', (err, res) => {
//     if(err) {
//         return console.log(err);
//     } else {
//         for(i in res){
            
//             Azienda=res[i];
//             console.log(Azienda.id_azienda)
//         }
//     }
// });
router.get(`/azienda/:id`, (req, res) => {
     connectionDb.query(`SELECT * FROM azienda WHERE id_azienda = '${id}' `,(err, res) => {
            if(err) {
               return console.log(err);
          } else {
                
                console.log(res)
                
            }
        })});

module.exports= router