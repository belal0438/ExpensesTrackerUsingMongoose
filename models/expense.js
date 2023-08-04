const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },

    decription: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        require: true,
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }

});

module.exports = mongoose.model('Expense', expensesSchema)
