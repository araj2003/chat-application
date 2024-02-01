const express = require('express')
const {register,login,profile,allUsers} = require('../contrallers/authContraller')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
//http://localhost:8000/api/auth
router.post('/register',register)
router.post('/login',login)
router.get('/profile',profile)
router.route('/').get(protect,allUsers)
module.exports = router