
const express = require('express');
router = express.Router();

const Authorization = require('../authorization/auth');
const ControllersPurchasPremium = require('../controllers/purchasePremium')


router.get('/purchasepremium', Authorization.Authenticate, ControllersPurchasPremium.purchasepremium);
router.post('/transaction-status',  Authorization.Authenticate, ControllersPurchasPremium.TransactionStatus)

module.exports = router;