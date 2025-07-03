const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { sendMessage } = require('../controller/message.controller');
const router = express.Router();

//Route for sending the message
router.post("/", protect,sendMessage)

//Router For Fetching all the message for a SingleChat
// router.get('/:chatId',protect,allMessages)

module.exports = router;