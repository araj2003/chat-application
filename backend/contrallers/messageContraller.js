const chat = require('../model/chat')
const Message = require('../model/message')
const user = require('../model/user')

const sendMessage = async(req,res) => {
    const {content,chatId} = req.body
    
    if(!content || !chatId ){
        return res.status(404).json({
            msg:"Invalid data passed into request"
        })
    }

    var newMessage = {
        sender:req.user.id,
        content:content,
        chat:chatId
    }

    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender","user_name profile_pic email")
        message = await message.populate("chat")
        message = await user.populate(message,{
            path:"chat.users",
            select:"user_name email profile_pic"
        })

        await chat.findByIdAndUpdate(chatId,{
            latestMessage:message
        })

       return  res.status(200).json(message)
        
    } catch (error) {
        console.log(error)
     return res.status(500).json({
        msg:"not able to send the message",

        error:error
     })   
    }

}

const getMessage = async(req,res) => {
    try {
        const {id:chatId} = req.params

    var messages = await Message.find({chat:chatId})
    .populate("sender","user_name profile_pic email")
    .populate("chat")
        console.log(messages)
    return res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}

module.exports = {sendMessage,getMessage}