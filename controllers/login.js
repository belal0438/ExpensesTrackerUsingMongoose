const User = require('../models/users');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');


function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}


function generateAccesKey (email, name){
   return jwt.sign({email, name}, 'jsonwebtoken');
}


exports.PostUserLogin = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;
        if (IsStringInvalid(email) || IsStringInvalid(password)) {
            return res.status(400).json({ success: false, message: "Email id or Password is incorrect" })
        }
        let user = await User.findOne({ email: email });
        //   console.log("is not nulll", user!==null); // true
        if (user !== null) {
            // console.log(user.password);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    throw new Error('somthing went wrong')
                }
                if (result == true) {
                    // console.log( "id "+ user._id+" name "+ user.name);
                    return res.status(200).json({ success: true, message: "User logged in succesfull",token:generateAccesKey(user.email, user.name)});
                } else {
                    return res.status(400).json({ success: false, message: "Password is incorrect" })
                }
            })
        } else {
            return res.status(404).json({ success: false, message: "User doesnot Exist" })
        }
    } catch (err) {
        res.status(500).json({
            message: err,
            success: false
        })
    }

}