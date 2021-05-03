const express = require('express');
const { response, json } = require('express');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
const jwtconfig = require('../config/jwt');
var session = require('express-session');
const { user } = require('../helpers/config');
var sqlconfig = require('../helpers/config');
var connection = mysql.createConnection(sqlconfig);

module.exports.HelloApi = (request, response) => {
    response.json({
        mensaje : "API hecha con <3 por Chayomix Studios",
        version : "TheChamberAPI v1.21 BUILD 3 @ 30042021 11:00 CDT"
    });
}

module.exports.AuthUser = (request, response) => {
    var username = request.body.username;
    var password = request.body.password;
    var AuthQuery = 'SELECT accountId, username FROM account WHERE username = ? AND (rolid = 1 OR rolid = 6 OR rolid = 7) AND password = sha2(?,224)';
    var GameQuery = 'SELECT accountId, username FROM account WHERE username = ? AND (rolid = 0 OR rolid = 2 OR rolid = 3 OR rolid = 4 OR rolid = 5) AND password = sha2(?,224)';
    connection.query(AuthQuery,
        [username, password],
        (error, results, fields)=>{
            if(error){
                response.json(error)
            }
            else{
                if(results[0] == null){
                    connection.query(GameQuery,
                        [username, password],
                        (error, results, fields)=>{
                            if(error){
                                response.send(error);
                            }
                            else{
                                if(results[0] == null){
                                    response.json({
                                        error: "Usuario no existe o contraseña incorrecta, Revisse credenciales y vuelve a intentar de nuevo"
                                    });
                                }else{
                                    response.json({
                                        error: "Usuario no autorizado para hacer pruebas. Prueba finalizada anteriormente, o usuario sin registrar sus datos. Entre a TheChamberWeb para completar su registro"
                                    });
                                }
                                
                            }
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
    var scores = [request.body.score1, request.body.score2]
    var durations = [request.body.duration1, request.body.duration2]
    var AuthQuery = 'UPDATE `tests` SET `testStatus_statusId` = 3, `duration` = ?, `overallScore` = ?, `finishedAtTimeStamp` = current_timestamp() WHERE `tests`.`testId` = ?';
    var Insert = 'INSERT INTO `scores` (`scoreId`, `test_testId`, `softSkill_idsoftSkill`, `softSkillScore`) VALUES (NULL, ?, ?, ?)';    
    connection.query(AuthQuery,
        [duration, overallScore, testId],
        (error, results, fields)=>{
            if(error){
                response.send(error);
            }
            else{
                for (var i = 1; i <= 2; i++) {
                    connection.query(Insert,
                        [testId, (i), scores[i-1], durations[i-1]],
                        (error, results, fields)=>{
                            console.log("Holaaa")
                            console.log(i)
                            console.log(scores[i-1])
                            console.log(durations[i-1])
                            if(error){
                                console
                                console.error(error)
                                response.send(error);
                            }else{
                                console.log(results)
                                console.log(fields)
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