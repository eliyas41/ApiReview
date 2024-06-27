const express = require('express')
const router = express.Router()

const { register, login } = require('../controllers/useController')


router.post("/register", register)
router.post("/login", login)



router.get("/hello", register)
router.delete("/hello")
router.put("/hello")



module.exports = router;