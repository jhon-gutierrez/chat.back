const constants = require('../Utils/constants.js');
const { configconnection } = require('./DataBaseConnection.js');
const mysql = require('mysql');

exports.create = async (params) => {
    console.log('Params received in create:', params); // Depuración
    const { message, nickName } = params;

    return new Promise((resolve, reject) => {

        const connection = mysql.createConnection(configconnection);
        const sql = 'CALL SP_Message_I(?, ?)';

        connection.query(sql, [message,nickName], (err, results, fields) => {
                
            if (err) {
                console.log("No guardó el mensaje" + err);
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
