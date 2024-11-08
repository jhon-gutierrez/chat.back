require('dotenv').config();
const mysql = require('mysql');

const configconnection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const pool = mysql.createPool(configconnection);
   
module.exports = pool;
 