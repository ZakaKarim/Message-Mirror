const express = require('express');
const { registerUser, loginUser, allUsers } = require('../controller/user.controller');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/',protect,allUsers)

module.exports = router;
