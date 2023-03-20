const express = require("express");
const app = express();
const connectionDb = require("./db");
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

const getCompanyById = app.get("/azienda", (req, res) => {
     connectionDb.query(`SELECT * FROM azienda WHERE id_azienda = '${id}' `,(err, res) => {
            if(err) {
               return console.log(err);
          } else {
                
                console.log(res)
                
            }
        })});

