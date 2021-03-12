// var (scope global), let (scope especifico)

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config  = require('./config/jwt');
// clave valor
const app = express();
app.set("key", config.key); 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(3000, ()=>{
    console.log("Server iniciado en el pueto 3K");
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