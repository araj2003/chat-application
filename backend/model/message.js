const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId,ref:'user'},
    content:{
        type:String,
        trim:true
    },
    readBy:[{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }],
    chat:{
        type:mongoose.Schema.ObjectId,
        ref:'chat'
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('message',messageSchema)