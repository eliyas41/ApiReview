const mysql2 = require('mysql2')

const dbConnection = mysql2.createConnection({
  user: "discord",
  database: "discord",
  host: "localhost",
  password: "KgzzRGRXE*wfGyP8"
})

module.exports = dbConnection.promise();