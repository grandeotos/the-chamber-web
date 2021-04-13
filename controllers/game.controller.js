const e = require('express');
const { response } = require('express');
var mysql = require('mysql');
var config = require('../helpers/config');
var connection = mysql.createConnection(config);

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

module.exports.AuthUser = (request, response) => {
    var body = request.body;
    var AuthQuery = 'SELECT * FROM accounts WHERE username = ? AND password = sha2(?,224) AND rolid > 0';
    connection.query(AuthQuery,
        [body],
        (error, results, fields)=>{
            if(error){
                response.send(error);
            }
            else{
                response.json(results);
            }
        });
}

module.exports.SetCheckPoint = (request,response) => {
    
}


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
