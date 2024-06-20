// Required modules and db connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// Register user
async function register(req, res) {
  const { userName, firstName, lastName, email, password } = req.body;
  if (!userName || !firstName || !lastName || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the required fields" });
  }

  try {
    // Check if user already exists
    const [existingUser] = await dbConnection.query(
      "SELECT userName FROM register WHERE userName=? OR email=?",
      [userName, email]
    );
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into register table
    const [result] = await dbConnection.query(
      "INSERT INTO register(userName, email, password, firstName, lastName) VALUES (?,?,?,?,?)",
      [userName, email, hashedPassword, firstName, lastName]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

// Login user
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all the required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT userName, password FROM register WHERE email = ?",
      [email]
    );
    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user[0].userid }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(StatusCodes.OK).json({
      msg: "User logged in successfully",
      token,
      user: {
        id: user[0].userid,
        display_name: user[0].userName,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

// Exporting all methods
module.exports = {
  register,
  login,
};
