const express = require('express');
const { setAvatar } = require('../contrallers/setAvatar');
const router = express.Router();

router.post('/setAvatar/:id',setAvatar)

module.exports = router
