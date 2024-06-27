const dbConnection = require('../db/dbConfig')
const { StatusCodes } = require("http-status-codes")
const bcrypt = require('bcrypt')


async function register(req, res) {
  const { userName, email, firstName, lastName, password } = req.body
  if (!userName || !email || !firstName || !lastName || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please fill all the fields' })
  }

  try {
    // Check if user already exist in the database
    const [existingUser] = await dbConnection.query(
      `SELECT userName FROM register WHERE userName = ?`, [userName]
    );
    console.log(existingUser);

    if (existingUser.length > 0) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'User already exist' })
    }

    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password must be at least 8 Characters' })
    }

    // Encrypt users password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword);

    const [result] = await dbConnection.query(
      "INSERT INTO register(email, userName, firstName, lastName, password) VALUES(? , ?, ?, ?, ?)",
      [email, userName, firstName, lastName, hashedPassword]
    );

    res.status(StatusCodes.CREATED).json({ message: 'User created successfully' })

  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong, please try again' })
  }
}

async function login(req, res) {
  const { email, password } = req.body
  // console.log(email, password);
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Please fill all the fields'
    })
  }

  try {
    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password must be at least 8 Characters' })
    }

    const [user] = await dbConnection.query(
      "SELECT userName, password FROM register WHERE email = ?", [email]
    )
    // console.log(user);

    const isMatch = await bcrypt.compare(password, user[0].password)
    if (!isMatch) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Invalid Credential"
      })
    }

    res.status(StatusCodes.OK).json({
      msg: "User logged in successfully"
    })

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { register, login }

