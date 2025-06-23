const express = require('express');
const { registerUser, loginUser } = require('../controller/user.controller');
const router = express.Router();

router.post('/',registerUser)
router.post('/login',loginUser)

module.exports = router;
