const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register User
exports.register = async (req, res) => {
    try {

        const { username, email, password, role } = req.body;


        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
            borrowedBooks: []
        });


        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                borrowedBooks: user.borrowedBooks
            }
        });


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};



// Login User
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }


        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }


        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        res.status(200).json({

            message: "Login Successful",

            token

        });


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};