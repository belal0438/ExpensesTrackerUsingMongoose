const express = require('express');
router = express.Router();

const ControllersLogin = require('../controllers/login')


router.post('/login', ControllersLogin.PostUserLogin);

module.exports = router;