const constants = require('../Utils/constants.js');
let pool = require('./DataBaseConnection.js');

exports.create = async (params) => {
    console.log('Params received in create:', params); // Depuración
    const { message, nickName, recipientNickName, status  } = params;

    return new Promise((resolve, reject) => {

        const sql = 'CALL SP_Message_I(?, ?, ?, ?)';
        pool.query(sql, [message,nickName, recipientNickName, status], (err, results, fields) => {
                
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
        //connection.end();
    });
};

exports.consultMessages = async (nickName) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT nickName, recipientNickName, message, createDate, status 
            FROM messages 
            WHERE recipientNickName IN (?, 'generalgroup') OR nickName = ?
            ORDER BY createDate ASC
        `;

        console.log('NickName recibido:', nickName); // Verifica que el nickName es correcto

        pool.query(sql, [nickName, nickName], (err, results, fields) => {
            if (err) {
                console.error("Error al consultar los mensajes: ", err);
                resolve({
                    status: constants.STATUSES.ERROR,
                    msg: err
                });
            } else {
                                
                resolve({
                    status: constants.STATUSES.OK,
                    data: results, 
                });
            }
        });
    });
};
