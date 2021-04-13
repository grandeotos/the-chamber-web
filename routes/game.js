var express = require('express');
var router = express.Router();

var controller = require('../controllers/game.controller');


//localhost:8020/game/cars
router.get('/login', controller.AuthUser)
router.get('/xxxx', controller.yyyy);
router.get('/zzzz/:id', controller.aaaaaa);
router.post('/bbbbb', controller.insert_planta);
module.exports = router;