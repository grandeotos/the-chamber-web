// var (scope global), let (scope especifico)

const express = require('express');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
var session = require('express-session');
var path = require('path');
const config  = require('./config/jwt');
const sqlconfig = require('./helpers/config');
var connection = mysql.createConnection(sqlconfig);
// clave valor
const app = express();
//app.set("key", config.key); 
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server iniciado en el pueto 300");
});

app.get('/', function(request, response) {
    response.redirect("/LoginPanel.html")
});

const middleware = express.Router();
middleware.use((req, res, next) => {
    const token = req.headers["auth-token"];

    if (token){
        //valid
        jwt.verify(token, app.get("key"), (err, decoded)=>{
            if (err){
                return res.json({mensaje:"Token invalido"})
            }
            else{
                console.log(decoded.id)
                console.log(decoded.user)
                req.decoded = decoded
                next()
            }
        });
        }else{
        res.send({mensaje: "Token no proporcionado"})
    }

})

//HTTP GET ** POST
app.post('/login', (req, res) =>{

    if(req.body.user == "grandeotos" && req.body.password == "123123") {
        
        const payload = {
            id: 35,
            user: req.body.user
        }

        const token = jwt.sign(payload, app.get("key"), {expiresIn: 7200});
        
        res.json({
            mensaje: "Correct Auth",
            token: token
        });
    }
    else{
        res.json({
            mensaje: "Auth Failed",
        })
    }
})

app.get('/user', middleware, (req, res) => {
    const datos = [
        {id:1, nombre: "Otos"},
        {id:2, nombre: "Otos"},
        {id:3, nombre: "Otos"}
    ]
    
    res.json(datos)
})

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password! ' + username + " " + password);
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password! ' + username + " "  + password);
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.redirect("/AdminPanel.html")
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});