
const express = require('express');
router = express.Router();

const ControllersSignup = require('../controllers/signup')


router.post('/users', ControllersSignup.postUser);

module.exports = router;