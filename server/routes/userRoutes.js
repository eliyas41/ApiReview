const express = require('express')
const router = express.Router()

const { register } = require('../controllers/useController')


router.post("/register",)
router.get("/hello", register)
router.delete("/hello")
router.put("/hello")



module.exports = router;