const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        requried:true,
        min:8
    },
    profile_pic:{
        type:String,
        default:""
    },
    is_avatar:{
        type: Boolean,
        default:false,
    }
})

module.exports = mongoose.model("user",userSchema)