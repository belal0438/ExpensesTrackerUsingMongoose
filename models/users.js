const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2  
    },


    phone: {
        type: Number,
        min: [10, 'Phone number should contain at least ten digits!'],
        required: true,
    },

    email: {
        type: String,
        require: true,
        unique: [true, "Email id should be unique"],
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 4,
    },

    gender: {
        type: String,
        required: true,
    },

    ispremiumuser:{
        type:Boolean,
        default:false
    },
    totalexpenses: {
        type: String,
        defaultValue:0
    }
});


module.exports = mongoose.model('User', userSchema)
