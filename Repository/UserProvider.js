const constants = require('../Utils/constants.js');

let mysql = require('mysql');
let { configconnection } = require('./DataBaseConnection.js');

function valida(plist) {
  let res = true;
  for (let index = 0; index < plist.length; index++) {
    const element = plist[index];
    if (element == null || element == undefined) { 
      res = false; 
      break; }
  }
  return res;
}

exports.create = async (params) => {
  return new Promise((resolve, reject) => {
    const { nickName } = params;
    let data = [nickName];

    if (!valida(data)) {
      reject({
        status: constants.STATUSES.ERROR,
        msg: 'Invalid data'
      });
    }

    let connection = mysql.createConnection(configconnection);
    let sql = `CALL SP_User_I(?)`;

    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        reject({
          status: constants.STATUSES.ERROR,
          msg: err
        });
      } else {
        resolve({
          status: constants.STATUSES.OK,
          data: results[0],
        });
      }
    });

    connection.end();
  });
}