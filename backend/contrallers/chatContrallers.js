const Chat = require('../model/chat');
const user = require('../model/user');


const createChat = async(req,res) => {
    try {
        const {userId} = req.body

        if (!userId) {
            console.log("UserId param not sent with request");
            return res.sendStatus(400);
          }

        var isChat = await Chat.find({
            isGroupChat:false,
            $and:[
                {users:{$elemMatch:{$eq:req.user.id}}},
                {users:{$elemMatch:{$eq:userId}}}
            ]
        })
        .populate("users","-password")
        .populate("latestMessage")
        

        isChat = await User.populate(isChat,{
            path:"latestMessage.sender",
            select:"user_name profile_pic email"
        })

        if(isChat.length > 0){
            res.json(
                isChat[0]
            )
        }   
        else{
            var chatData = {
                isGroupChat:false,
                chatName:"sender",
                users:[req.user.id,userId]
            }
            try {
                const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id:createdChat._id}).populate(
                "users",
                "-password"
            )

            res.status(200).json(
                fullChat
            )
                
            } catch (error) {
                res.json({
                    msg:"error in creating new chat",
                    error:error
                })
            }

            
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg:"internal server error",
            error:error
        })
    }
}


const getAllChat = async(req,res) => {
    try {
        Chat.find({users:{$elemMatch:{$eq:req.user.id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=> {
            results = await user.populate(results,{
                path:"latestMessage.sender",
                select:"user_name email profile_pic"
            })

            res.status(200).send(results)
        })
    } catch (error) {
        res.json({
            msg:"error getting chats",
            error:error
        })
    }
}

const createGroup = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({
            message: "please fill the fields"
        });
    }

    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).json("more than 2 users to form a group chat");
    }

    // Extract user IDs and add them to the array
    users.push(req.user.id);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user.id
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(500).json({
            msg: "cannot create group chat",
            error: error.message
        });
    }
};

const renameGroup = async(req,res) => {
    const {name,chatId} = req.body
    const updatedGroup = await Chat.findByIdAndUpdate(chatId,{
        chatName:name
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")


    if(!updatedGroup){
        return res.status(400).json({
            msg:"no chat found"
        })
    }
    else{
        return res.status(200).json(updatedGroup)
    }
}

const addToGroup = async(req,res) => {
    const {chatId,userId} = req.body
    const added = await Chat.findByIdAndUpdate(chatId,{
        $push:{users:userId}
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")


    if(!added){
        return res.status(400).json({
            msg:"no chat found"
        })
    }
    else{
        return res.status(200).json(added)
    }
}

const removeFromGroup = async(req,res) => {
    const {chatId,userId} = req.body
    const removed = await Chat.findByIdAndUpdate(chatId,{
        $pull:{users:userId}
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")


    if(!removed){
        return res.status(400).json({
            msg:"no chat found"
        })
    }

    else{
        return res.status(200).json(removed)
    }
}



module.exports = {createChat,getAllChat,createGroup,renameGroup,addToGroup,removeFromGroup}