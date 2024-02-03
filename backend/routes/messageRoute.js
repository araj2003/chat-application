const express = require('express')
const {getMessage,sendMessage} = require('../contrallers/messageContraller')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

//http://localhost:8000/api/message


//create a message 
router.route('/').post(protect,sendMessage)

//get all message from a chat
router.route('/:id').get(protect,getMessage)

module.exports = router