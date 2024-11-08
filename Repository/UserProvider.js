const constants = require('../Utils/constants.js');
let pool = require('./DataBaseConnection.js');

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

exports.findUserByNickName = async (nickName) => {
  return new Promise((resolve, reject) => {
    const sql = `CALL user_select_by_nickName(?)`;  
    pool.query(sql, [nickName], (err, results, fields) => {   
      if (err) {
        reject(err);
      } else {
        resolve(results[0][0]);
      }
    });
  });
};

exports.create = async (params) => {
  return new Promise((resolve, reject) => {
    const { nickName, password } = params;
    let data = [nickName, password];

    if (!valida(data)) {
      reject({
        status: constants.STATUSES.ERROR,
        msg: 'Invalid data'
      });
    }

    let sql = `CALL SP_User_I(?,?)`;
    pool.query(sql, data, (err, results, fields) => {
      if (err) {
        reject({
          status: constants.STATUSES.ERROR,
          msg: err
        });

        console.log("Error en /user/create:", err);
        
      } else {
        resolve({
          status: constants.STATUSES.OK,
          data: results[0],
        });
      }
    });
  });
}