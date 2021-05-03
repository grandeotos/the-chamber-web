var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
var session = require('express-session');
const config = require('./config/jwt');
const sqlconfig = require('./helpers/config');
var connection = mysql.createConnection(sqlconfig);
var thechamber = require('./routes/game');
var router = express.Router();
var controller = require('./controllers/game.controller');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// clave valor
app.set("key", config.key); 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());

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
        mensaje : "Este sitio esta arriba, ve a /api",
        version : "TheChamberAPI v1.21 BUILD 3 @ 30042021 11:00 CDT"
    });
})

app.get('/api', controller.HelloApi)
app.post('/login', controller.AuthUser)
app.post('/prueba', controller.SubmitTest);
app.post('/checkpoint' ,controller.SetCheckPoint);
app.post('/finish', controller.finishTest);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
