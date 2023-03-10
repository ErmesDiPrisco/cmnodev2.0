const express = require("express")
const mysql = require("mysql")
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// const errMsg = document.getElementById("err_msg");

const porta = 3000;


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));

  const checkAuth = (req, res, next) => {
    if (!req.session.userId || req.session.userId== undefined) {
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
    req.session.userId = undefined;
    res.sendFile(__dirname + "/index.html")
})

app.post("/login", (req, res) => {

    var emaill = req.body.email
    var passwordd = req.body.password
    let checks=(args)=>{

        for(let i in args){

            if (args[i].email === emaill && args[i].password === passwordd){

                return true

            }
        }
    }

    connectionDb.query(

        `select email, password, abilitato from account a \
        inner join account_dipendente ad on ad.id_account = a.id_account \
        inner join dipendente d on d.id_dipendente=ad.id_dipendente`,
        (err, result) => {

            if (err){

                return console.log(err);

            }else{
                console.log(checks(result))

                if (checks(result)==true){

                    console.log(req.session.userId)
                    req.session.userId = 1;
                    res.redirect('/home')

                }else{

                    // format.classList.add('error');
                    console.log('campi errati')

                    res.send('\
                        <div style = "text-align: center">\
                            <h1 style = "font-weight: 200px"> Credenziali Errate </h1>\
                            </br>\
                            <button style = "background-color: black; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 15px; cursor: pointer;"><a style = "text-decoration: none; color: white;" href="/login">Login</a></button>\
                        </div>')

                }
                
            }
            
                
                    
                    
                       
                    

        }
                //return console.log(result[0].password);

            
          
        
    
        
    );

    // console.log("Email: " + emaill)
    // console.log("Password: " + passwordd)


})

app.get('/home', checkAuth, (req, res) => {
    res.redirect('http://localhost:4200/')
  });


