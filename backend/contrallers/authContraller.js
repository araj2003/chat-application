const userModal = require('../model/user');
const { hashPassword, comparePassword } = require('../helper/hash');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const {user_name,email,password} = req.body;
        const userNameCheck = await userModal.findOne({user_name})
        if(userNameCheck){
            return res.json({
                msg:"username is already used",
                status:false
            })
        }    
        const emailCheck = await userModal.findOne({email})
        if(emailCheck){
            return res.json({
                msg:"Email already in use",
                status:false
            })
        }
        const newPassword = await hashPassword(password)
        const user = await userModal.create({
            email,
            user_name,
            password:newPassword
        })
        delete user.password
        return res.json({
            status:true,
            user
        })
    } catch (error) {
        res.json({
            error
        })
    }
    

};


const login = async (req, res) => {
    // const { user_name, password } = req.body;

    // try {
    //     const user = await userModal.findOne({ user_name });

    //     if (!user) {
    //         return res.json({
    //             error: "Username or email does not exist"
    //         });
    //     }

    //     const isPass = await comparePassword(password, user.password);

    //     if (!isPass) {
    //         return res.json({
    //             error: "Password not correct"
    //         });
    //     }

    //     jwt.sign({ email: user.email, id: user._id, user_name: user.user_name },
    //         process.env.JWT_SECRET, {},
    //         (err, token) => {
    //             if (err) {
    //                 console.error(err);
    //                 return res.status(500).json({
    //                     error: "Internal server error"
    //                 });
    //             }
    //             res.cookie('token', token).json(user);
    //         }
    //     );
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({
    //         error: "Internal server error"
    //     });
    // }
    return res.json({
        login
    })
};

module.exports = { register, login };
