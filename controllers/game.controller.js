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
    var AuthQuery = 'INSERT INTO `tests` (`testId`, `accountId`, `testStatus_statusId`, `beganAtTimeStamp`, `duration`, `finishedAtTimeStamp`, `overallScore`) VALUES (NULL, ?, 2, current_timestamp(), NULL, NULL, NULL)';
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
                    pruebaId: results.insertId
                });
            }
        });
}

module.exports.finishTest = (request, response) => {
    console.log(request)
    var duration = request.body.duration;
    var testId = request.body.testId;
    var overallScore = request.body.overallScore;
    var scores = [request.body.score1, request.body.score2, request.body.score3, request.body.score4]
    var durations = [request.body.duration1, request.body.duration2, request.body.duration3, request.body.duration4]
    console.log(duration);
    var AuthQuery = 'UPDATE `tests` SET `testStatus_statusId` = 2, `duration` = ?, `overallScore` = ?, `finishedAtTimeStamp` = current_timestamp() WHERE `tests`.`testId` = ?';
    var Insert = 'INSERT INTO `scores` (`scoreId`, `test_testId`, `softSkill_idsoftSkill`, `softSkillScore`) VALUES (NULL, ?, ?, ?)';
    
    connection.query(AuthQuery,
        [duration, overallScore, testId],
        (error, results, fields)=>{
            if(error){
                response.send(error);
            }
            else{
                for (var i = 1; i < 5; i++) {
                    connection.query(Insert,
                        [testId, i, scores[i], durations[i]],
                        (error, results, fields)=>{
                            if(error){
                                console.log(error);
                            }
                        });
                 }
                response.json({
                    mensaje: "Prueba finalizada correctamente",
                    affectedRows: results.affectedRows,
                });
            }
        });
}

module.exports.SetCheckPoint = (request,response) => {
    var testId = request.body.testId;
    var score = request.body.score;
    var maxScore = request.body.maxScore;
    var idsoftSkill = request.body.idsoftSkill;
    var idlevel = request.body.idlevel;
    var idPuzzle = request.body.idPuzzle;
    var timeElapsed = request.body.timeElapsed;
    console.log(testId, score)
    var CheckPointInsert = 'INSERT INTO `checkpoints` (`checkpointId`, `test_testId`, `checkpointScore`, `checkpointMaxScore`, `softSkillId`, `levelId`, `puzzleId`, `timeElapsed`, `timeStamp`) VALUES (NULL, ?, ?, ?, ?, ?, ?, NULL, current_timestamp())';
    //var CheckPointQuery = 'SELECT * FROM `checkpoints` WHERE checkpointid = ?'
    connection.query(CheckPointInsert,
        [testId,score,maxScore,idsoftSkill,idlevel,idPuzzle,timeElapsed],
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