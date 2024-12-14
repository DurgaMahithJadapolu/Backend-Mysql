const express = require('express');
const { signup, login } = require('../Controller/AuthController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
