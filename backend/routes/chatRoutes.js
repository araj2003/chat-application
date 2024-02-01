const express = require('express')
const protect = require('../middleware/authMiddleware')
const {createChat,getAllChat,createGroup,renameGroup,addToGroup,removeFromGroup} = require('../contrallers/chatContrallers')

const router = express.Router()

//http://localhost:8000/api/chat

//create a chat(req.body - userid)
router.route('/').post(protect,createChat)

// //get all chats
router.route('/').get(protect,getAllChat)




// //create a group chat
router.route('/group').post(protect,createGroup)

// //add users in group chat
router.route('/groupAdd').put(protect,addToGroup)

// //rename groupname(groupId)
router.route('/renameGroup').put(protect,renameGroup)

// //remove user from groupchat
router.route('/groupRemove').put(protect,removeFromGroup)


module.exports = router
