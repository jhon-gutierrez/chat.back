require('dotenv').config();

let mysql = require('mysql');
let { configconnection } = require('./DataBaseConnection.js');

function valida(plist){
    let res = true;
    for (let index = 0; index < plist.length; index++) {
        const element = plist[index];
        if(element == null || element == undefined) {res = false; break;} 
    }
    return res;
}

exports.create = async (params) => {
    const { nickName } = params;
    let data = [nickName];
    
    if(!valida(data)) {
      return{
        status: 'Error',
        msg: 'Invalid data'
      }    
    }

    let connection = mysql.createConnection(configconnection);
    let sql = `CALL SP_User_I(?)`;

    try {
        connection.query(sql, data, (err, results, fields) => {
          if (err) {
            console.error('err from callback: ' + err.stack);
            return{
              status: 'Error'
            }
          }else{
            return {
                status: "Ok",
                data: results[0],
            };
          }      
        });
    } catch (e) {
        console.error('err thrown: ' + e.stack);
        return{
          status: 'Error'
        }        
    }
    connection.end();
}