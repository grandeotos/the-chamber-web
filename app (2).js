// var (scope global), let (scope especifico)

var mysql = require('mysql');
const jwt = require('jsonwebtoken');
var session = require('express-session');
var path = require('path');
const config = require('./config/jwt');
const sqlconfig = require('./helpers/config');
const e = require('express');
var connection = mysql.createConnection(sqlconfig);
var thechamber = require('./routes/game');
var express = require('express');
var router = express.Router();
var controller = require('./controllers/game.controller');
const { PORT = 42069 } = process.env

// clave valor
const app = express();
app.set("key", config.key); 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server iniciado en el pueto ${PORT}`);
});

express.Router();
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

app.get('/', (req, res) => {
    res.json({
        mensaje : "Este sitio esta arriba, ve a /api"
    });
})

app.get('/api', controller.HelloApi)
app.post('/login', controller.AuthUser)
app.post('/prueba', controller.SubmitTest);
app.post('/checkpoint' ,controller.SetCheckPoint);
app.post('/finish', controller.finishTest);