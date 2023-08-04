
const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.Authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const tokenVarify = jwt.verify(token, 'jsonwebtoken');
        // console.log(tokenVarify);
        if (tokenVarify.email == null || tokenVarify.name == null) {
            throw new Error('somthing went wrong')
        }
        const email = tokenVarify.email
        const user = await User.findOne({ email });
        req.user = user
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'User doesnot Exist' })
    }
}