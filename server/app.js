require("dotenv").config();
const express = require('express')
const cors = require('cors')
const dbConnection = require('./db/dbConfig')
const userRoutes = require('./routes/userRoutes')
const app = express()
const port = 4000;
app.use(express.json());

app.use(cors())
app.use('/api/users', userRoutes)

// Start the database connection and the server
async function start() {
  try {
    // Test the database connection
    const [result] = await dbConnection.execute("SELECT 'test' as test");
    console.log("Database test result:", result);

    app.listen(port, () => {
      console.log(`Database connection is established`);
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
}

start();
