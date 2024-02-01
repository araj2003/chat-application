const userModal = require('../model/user')

const setAvatar = async (req, res) => {
    try {

        const { id: userId } = req.params
        const { image } = req.body

        const user = await userModal.findByIdAndUpdate(userId, {
            is_avatar: true,
            profile_pic: image
        })
        return res.json({
            isSet: user.is_avatar,
            image: user.profile_pic
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports = { setAvatar }