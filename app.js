const express = require("express")
const mysql = require("mysql")
const session = require('express-session');
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

const porta = 3000;

app.use(session({
    secret: 'supersegreto',
    resave: false,
    saveUninitialized: true
  }));
  
  const checkAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('/login');
    } else {
      next();
    }
  };
const connectionDb = mysql.createConnection({
    user: "root",
    password: "Password01!",
    database: "cloudmark",
    host: "database-classicmodels.cetsul63nyeq.eu-south-1.rds.amazonaws.com",
    port: "3306",
});

connectionDb.connect((err)=>{
    if(err){
        return console.log(err) 
    }
    console.log("Connesso..")
    
}) 

app.listen(porta, () => {
  console.log("server avviato sulla porta " + porta);
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/login", (req, res) => {

    var emaill = req.body.email
    var passwordd = req.body.password
    let checks=(args)=>{
        for(let i in args){
            // console.log("Email_DB: " + args[i].email)
            // console.log("Password_DB: " + args[i].password)
            if (args[i].email === emaill && args[i].password === passwordd){
                return true

        }
    }}

    connectionDb.query(

        `select email, password, abilitato from account a \
        inner join account_dipendente ad on ad.id_account = a.id_account \
        inner join dipendente d on d.id_dipendente=ad.id_dipendente`,
        // where email = ? and password = ?", 
        // [email, password],
        (err, result) => {

            if (err){

                return console.log(err);

            }else{
                console.log(checks(result))
                if (checks(result)==true){
                    req.session.userId = 1;
                    res.redirect('/home')
                }else{
                    console.log('campi errati')
                    res.send('<h1>Hai sbagliato tutto</h1></br>\
                                <button ><a href="/login">Login</a></button>')
                }

            }
                
                    
                    
                       
                    

        }
                //return console.log(result[0].password);

            
          
        
    
        
    );

    // console.log("Email: " + emaill)
    // console.log("Password: " + passwordd)

})

app.get('/home', checkAuth, (req, res) => {
    res.send('Home');
  });