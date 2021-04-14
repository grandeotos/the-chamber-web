const express = require('express');
const { response, json } = require('express');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
const jwtconfig = require('../config/jwt');
var session = require('express-session');
const { user } = require('../helpers/config');
var sqlconfig = require('../helpers/config');
var connection = mysql.createConnection(sqlconfig);
//Devuelve todos los registros de autos
/*
module.exports.plants_list = (request, response) => {
    var sql = 'SELECT * FROM planta';
    connection.query(sql, (error, results, fields) => {
        if(error) {
            response.send(error);
        } else {
            response.json(results);
        }
    });
}

module.exports.get_plant = (request, response) => {
    var sql = 'SELECT * FROM planta WHERE idPlanta = ?';
    connection.query(sql, [request.params.id], (error, results, fields) => {
        if(error){
            response.send(error);
        } else {
            response.json(results);
        }
    });
}*/


module.exports.HelloApi = (request, response) => {
    response.json({
        mensaje : "API hecha con <3 por Chayomix Studios"
    });
}

module.exports.AuthUser = (request, response) => {
    var username = request.body.username;
    var password = request.body.password;
    var AuthQuery = 'SELECT accountId, username FROM account WHERE username = ? AND password = sha2(?,224) AND rolid > 0';
    connection.query(AuthQuery,
        [username, password],
        (error, results, fields)=>{
            if(error){
                response.json(error)
            }
            else{
                if(results[0] == null){
                    response.json({
                        error: "Usuario no existe o contraseña incorrecta, Revisse credenciales"
                    });
                }
                else{
                    console.log(results[0].accountId);
                    const payload = {
                        id: results[0].accountId,
                        user: request.body.username
                    }
            
                    const token = jwt.sign(payload, jwtconfig.key, {
                        expiresIn: 7200
                    });
                    console.log(results);
                    console.log(typeof(results));
                    (results[0]).mensaje = "Autenticado";
                    (results[0]).token = token;
                    response.json(results[0]);
                }
                
            }
        });
}

module.exports.SubmitTest = (request, response) => {
    console.log(request)
    var accountId = request.body.accountId;
    console.log(accountId);
    var AuthQuery = 'INSERT INTO `test` (`idpruebas`, `accountId`, `timeStamp`) VALUES (NULL, ?, current_timestamp())';
    connection.query(AuthQuery,
        accountId,
        (error, results, fields)=>{
            if(error){
                response.send(error);
            }
            else{
                //console.log(fields);
                //response.json(results);
                response.json({
                    mensaje: "Prueba creada correctamente",
                    affectedRows: results.affectedRows,
                    insertId: results.insertId
                });
            }
        });
}

module.exports.SetCheckPoint = (request,response) => {
    var idcheckpointType = request.body.idCheckpointType;
    var idPrueba = request.body.idPrueba;
	var score = request.body.score;
    console.log(idcheckpointType, idPrueba, score)
    var CheckPointInsert = 'INSERT INTO `checkpoints` (`checkpointid`, `idprueba`, `idcheckpointType`, `score`, `timeStamp`) VALUES (NULL, ?, ?, ?, current_timestamp())';
    var CheckPointQuery = 'SELECT * FROM `checkpoints` WHERE checkpointid = ?'
    connection.query(CheckPointInsert,
        [idPrueba, idcheckpointType, score],
        (error, results, fields)=>{
            if(error){
                response.send(error);
            }
            else{
                response.json({
                    mensaje: "Checkpoint creado correctamente",
                    affectedRows: results.affectedRows,
                    insertId: results.insertId
                });
            }
        });
}

/*
module.exports.insert_planta = (request, response) => {
    //request.body contiene los datos del auto en
    //formato JSON -> se lo envia al cliente
    var plantio = request.body;
    //var sql = 'INSERT INTO cars VALUES(?,?,?,?)'
    var sql = 'INSERT INTO planta SET ?';
    connection.query(sql,
    [plantio],
    (error, results, fields) => {
        if (error) {
            response.send(error);
        } else {
            response.json(results);
        }
    });
}
*/