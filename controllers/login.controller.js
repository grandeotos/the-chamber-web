var mysql = require('mysql');
var config = require('../helpers/config');
var connection = mysql.createConnection(config);

module.exports.loginRequest = (req, res) => {
    var sql = 'UNA QUERY SQL';
    connection.query(sql, (error, results, fields) => {
        if (error) {
            response.send(error);
        } else {
            response.send(results);
        }
    });
}