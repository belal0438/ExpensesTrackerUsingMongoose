const User = require('../models/users');
const bcrypt = require('bcrypt');

exports.postUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, phone, email, password, gender } = req.body;

        const Checkuser = await User.findOne({ email: email, phone: phone, name: name });
        if (Checkuser) {
            return res.status(403).json({ message: "User Already Exist" })
        } else {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, async (err, hash) => {

                if (err) {
                    console.log(err);
                }
                const user = new User({ name, phone, email, password: hash, gender });
                await user.save();
                return res.status(201).json({ message: `${name} Acount succesfully created` });

            });
        }

    } catch (error) {
        res.status(500).json(error);
    }

}