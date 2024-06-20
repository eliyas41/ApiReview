const mysql = require('mysql2')

const dbConnection = mysql.createPool({
  user: "discord",
  database: "discord",
  host: "localhost",
  password: "KgzzRGRXE*wfGyP8",
  connectionLimit: 10,
});


module.exports = dbConnection.promise();