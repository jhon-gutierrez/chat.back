const constants = require('../Utils/constants.js');
const { configconnection } = require('./DataBaseConnection.js');
const mysql = require('mysql');

exports.create = async (params) => {

    const { message, senderId } = params;

    return new Promise((resolve, reject) => {

        console.log("Se conectó a MySQL")
        const connection = mysql.createConnection(configconnection);
        const sql = 'CALL SP_Message_I(?, ?)';

        connection.query(sql, [message,senderId], (err, results, fields) => {
                
            if (err) {
                console.log("No guardó el mensaje");
                resolve({
                    status: constants.STATUSES.ERROR,
                    msg: err
                });
            } else {
                console.log("Guardó el mensaje");
                var jsonResult =JSON.stringify(results[0]);
                resolve({
                    status: constants.STATUSES.OK,
                    data: JSON.parse(jsonResult),
                });
            }
        });
        connection.end();
    });
};
