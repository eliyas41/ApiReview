const express = require("express")
const dbConnection = require('./db/dbConfig')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 4000
app.use(express.json())

app.use("/api", userRoutes)

async function start() {
  try {
    // test the  Database connection
    const [result] = await dbConnection.execute("SELECT 'test' as test");
    console.log("Database test result", result);

    app.listen(port, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Server is running on port ${port}`);
      }
    })
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
}

start()