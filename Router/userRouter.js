const express = require('express');
const { getUser, updateUser } = require('../Controller/UserController');
const { verifyToken } = require('../Middleware/AuthMiddleware');

const router = express.Router();

router.get('/user', verifyToken, getUser);
router.put('/user', verifyToken, updateUser);

module.exports = router;
