// var (scope global), let (scope especifico)

const express = require('express');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
var session = require('express-session');
var path = require('path');
const config = require('./config/jwt');
const sqlconfig = require('./helpers/config');
const e = require('express');
var connection = mysql.createConnection(sqlconfig);
var thechamber = require('./routes/game');
// clave valor
const app = express();
app.set("key", config.key); 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());

app.listen(42069, () => {
    console.log("Server iniciado en el pueto 42069");
});


const middleware = express.Router();
middleware.use((req, res, next) => {
    const token = req.headers["auth-token"];

    if (token) {
        //valid
        jwt.verify(token, app.get("key"), (err, decoded) => {
            if (err) {
                return res.json({
                    mensaje: "Token invalido"
                })
            } else {
                console.log(decoded.id)
                console.log(decoded.user)
                req.decoded = decoded
                next()
            }
        });
    } else {
        res.send({
            mensaje: "Token no proporcionado"
        })
    }

})

app.use('/game', thechamber)
/*
//HTTP GET ** POST
app.post('/login', (req, res) => {

    if (req.body.user == "grandeotos" && req.body.password == "123123") {

        const payload = {
            id: 35,
            user: req.body.user
        }

        const token = jwt.sign(payload, app.get("key"), {
            expiresIn: 7200
        });

        res.json({
            mensaje: "Correct Auth",
            token: token
        });
    } else {
        res.json({
            mensaje: "Auth Failed",
        })
    }
})
*/
app.get('/user', middleware, (req, res) => {
    const datos = [{
            id: 1,
            nombre: "Otos"
        },
        {
            id: 2,
            nombre: "Otos"
        },
        {
            id: 3,
            nombre: "Otos"
        }
    ]

    res.json(datos)
})
/*
app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = sha2(?,224) AND rolid > 0', [username, password], function (error, results, fields) {
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
        response.send('Please enter Username and Password! ' + username + " " + password);
        response.end();
    }
});*/
