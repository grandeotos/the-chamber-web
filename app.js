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
// clave valor
const app = express();
//app.set("key", config.key); 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.listen(42069, () => {
    console.log("Server iniciado en el pueto 42069");
});

app.get('/', function (request, response) {
    response.redirect("/LoginPanel.html")
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
});
/*
app.post('/appReg', function (request, response) {
    var elnuevobody = request.body
    var nombreAR = request.body.firstName;
    var apellidosAR = request.body.lastName;
    var emailAR = request.body.email;
    var phoneAR = request.body.telep;
    var experienceAR = request.body.exper;
    var profileAR = request.body.profix;
    var statusAR = 'New'
    if (!elnuevobody) {
        response.send("No hay body hermano :c");
    } else {
        if (nombreAR && apellidosAR && emailAR && phoneAR && experienceAR && profileAR) {
            var sqlr = "INSERT INTO `newaplicants` (`applicantID`, `firstName`, `lastName`, `email`, `phone`, `experience`, `profile`, `status`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)"
            connection.query(sqlr, [nombreAR, apellidosAR, emailAR, phoneAR, experienceAR, profileAR, statusAR],
                (error, results, fields) => {
                    if (error) {
                        response.send(fields + " XXXXXXX " + results + " XXXXXXX " + error);
                    } else {
                        response.send("Registro exitoso!");
                    }
                    response.end();
                });
        } else {
            response.send("Falta algun dato, REVISAR");
        }
        response.end();
    }
});
app.post('/gidReg', function (request, response) {
    var nombre = request.body.firstName;
    var apellidos = request.body.lastName;
    var curp = request.body.curp;
    var username = request.body.username;
    var password = request.body.password;
    var password2 = request.body.password2;
    var email = request.body.email;

    if (password != password2) {
        response.send("Las contraseñas no coinciden");
    } else {
        if (nombre && apellidos && curp && username && email) {
            var sqlq = "INSERT INTO `gamerids` (`idCandidato`, `nombre`, `lastName`, `password`, `email`, `gamerID`, `curp`) VALUES (NULL, ?, ?, ?, ?, ?, ?)"
            connection.query(sqlq, [nombre, apellidos, password, email, username, curp],
                (error, results, fields) => {
                    if (error) {
                        response.send(fields + " XXXXXXX " + results + " XXXXXXX " + error);
                    } else {
                        response.send("Registro exitoso!");

                    }
                });
        } else {
            response.send("Falta algun dato, REVISAR " + " CURP :" + curp + " Nombres :" + nombre + " Apellidos :" + apellidos + " gamerID/username :" + username + " Password1 :" + password + " Password2 :" + password2 + " email :" + email);
        }
    }
});

app.get('/home', function (request, response) {
    if (request.session.loggedin) {
        response.redirect("/AdminPanel.html")
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});*/