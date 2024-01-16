const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true,
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
    is_profile:{
        type: Boolean,
        default:false,
    }
})

mongoose.export = mongoose.model("user",userSchema)