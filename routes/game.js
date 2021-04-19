var express = require('express');
var router = express.Router();

var controller = require('../controllers/game.controller');

const middleware = express.Router();
middleware.use((req, res, next) => {
    const token = req.headers["auth-token"];

    if (token) {
        //valid
        jwt.verify(token, jwtconfig.key, (err, decoded) => {
            if (err) {
                return res.json({
                    mensaje: "Token invalido"
                })
            } else {
                console.log(decoded.accountId)
                console.log(decoded.username)
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

//localhost:8020/game/cars
router.get('/api', controller.HelloApi)
router.post('/login', controller.AuthUser)
router.post('/prueba', controller.SubmitTest);
router.post('/checkpoint' ,controller.SetCheckPoint);
router.post('/finish', controller.finishTest);
module.exports = router;