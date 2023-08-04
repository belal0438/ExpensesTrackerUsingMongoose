const express = require('express');
router = express.Router();

const ControllersExpenses = require('../controllers/expense');
const Authorization = require('../authorization/auth');




router.post('/expenses', Authorization.Authenticate, ControllersExpenses.postExpensesData);
router.get('/expenses',Authorization.Authenticate, ControllersExpenses.GetExpensesData);
router.delete('/expenses/:id',Authorization.Authenticate, ControllersExpenses.DeleteExpensesData);


router.get('/expenses_pagination',Authorization.Authenticate, ControllersExpenses.PaginationData);


router.get('/user',Authorization.Authenticate, ControllersExpenses.GetUserData);

module.exports = router;