const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;
app.use(cors())

const RoutesSignUp = require('./routes/signup');
const RoutesLogin = require('./routes/login');
const RoutesExpenses = require('./routes/expense');
const RoutesPremium  = require('./routes/premium')

app.use(express.json())
app.use('/signup', RoutesSignUp);
app.use('/login', RoutesLogin);
app.use('/expenses', RoutesExpenses);
app.use('/premium', RoutesPremium);

mongoose.connect("mongodb://127.0.0.1:27017/expenses")
.then(() =>{
    console.log("connection successfull!")
    app.listen(port);
})
.catch((err) =>{
console.log(err);
});
