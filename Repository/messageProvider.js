const constants = require('../Utils/constants.js');
const { configconnection } = require('./DataBaseConnection.js');
const mysql = require('mysql');

exports.create = async (params) => {

    const { senderId, message } = params;

    return new Promise((resolve, reject) => {

        const connection = mysql.createConnection(configconnection);
        const sql = 'CALL SP_Message_I(?, ?)';

        connection.query(sql, [message,senderId], (err, results, fields) => {
            if (err) {
                resolve({
                    status: constants.STATUSES.ERROR,
                    msg: err
                });
            } else {
                resolve({
                    status: constants.STATUSES.OK,
                    msg: 'Message created successfully',
                });
            }
        });
        connection.end();
    });
};
