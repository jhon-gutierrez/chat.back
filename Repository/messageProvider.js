const constants = require('../Utils/constants.js');
let pool = require('./DataBaseConnection.js');

exports.create = async (params) => {
    console.log('Params received in create:', params); // Depuración
    const { message, nickName, recipientNickName  } = params;

    return new Promise((resolve, reject) => {

        const sql = 'CALL SP_Message_I(?, ?, ?)';
        pool.query(sql, [message,nickName, recipientNickName], (err, results, fields) => {
                
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
