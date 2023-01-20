const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nikecampielmic6',
  database: 'usuaris'
});

connection.connect();

module.exports = connection;
