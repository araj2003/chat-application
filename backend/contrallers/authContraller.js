const userModal = require('../model/user');
const { hashPassword, comparePassword } = require('../helper/hash');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { user_name, email, password } = req.body;
        const userNameCheck = await userModal.findOne({ user_name })
        if (userNameCheck) {
            return res.json({
                msg: "username is already used",
                status: false
            })
        }
        const emailCheck = await userModal.findOne({ email })
        if (emailCheck) {
            return res.json({
                msg: "Email already in use",
                status: false
            })
        }
        const newPassword = await hashPassword(password)
        const user = await userModal.create({
            email,
            user_name,
            password: newPassword
        })
        delete user.password
        jwt.sign({email:user.email,id:user._id,user_name:user.user_name},process.env.JWT_SECRET,{},(err,token) => {
            if(err){
              throw err
            }
            return res.cookie('token',token).json({
                status: true,
                user
            })
          })
        
    } catch (error) {
        res.json({
            error
        })
    }


};


const login = async (req, res) => {
    try {
        const { user_name, password } = req.body;
        const user = await userModal.findOne({ user_name })
        if (!user) {
            return res.json({
                msg: "Username does not exist",
                status: false
            })
        }
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return res.json({
                msg: "incorrect password",
                status: false
            })
        }
        delete user.password;
        jwt.sign({email:user.email,id:user._id,user_name:user.user_name},process.env.JWT_SECRET,{},(err,token) => {
            if(err){
              throw err
            }
            return res.cookie('token',token).json({
                status: true,
                user
            })
          })
        
        
        
    } catch (error) {
        res.json({
            error
        })
    }


};

const profile = (req,res) => {
    const { token} = req.cookies || {};
    console.log(req.cookies)
    if(token){
      jwt.verify(token,process.env.JWT_SECRET,{},(err,user) => {
        if(err){
            console.error('JWT verification error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(user)
      })
    }
    else{
      res.json(null)
    }
  }

//api/auth/?search=abcd
const allUsers = async(req,res,next) => {
    const keyword = req.query.search
    ?{
        $or:[
            {user_name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{}

    const users = await userModal.find(keyword).find({_id:{$ne:req.user.id}})
    res.json(
        users
    )
}


module.exports = { register, login,profile ,allUsers};
