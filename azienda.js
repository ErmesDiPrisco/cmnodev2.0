const express = require("express");
const app = express();
const connectionDb = require("./db");
// const getAllCompanies = connectionDb.query('select * from azienda', (err, res) => {
//     if(err) {
//         return console.log(err);
//     } else {
//         console.log(res);
//     }
// });

const getCompanyById = app.get("/azienda", (req, res) => {
    res = connectionDb.query(`SELECT * FROM azienda WHERE id_azienda = ?`, [id], function (err, result) {
        if (err) throw err;
        console.log(result);
    }) 

})

