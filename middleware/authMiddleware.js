const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        const tk = req.header("Authorization");


        if (!tk) {
            return res.status(401).json({
                message: "Access Denied. No Token"
            });
        }


        const token = tk.split(" ")[1];


        if (!token) {
            return res.status(401).json({
                message: "Access Denied. Invalid Token Format"
            });
        }


        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.user = verified;


        next();


    } catch (err) {

        res.status(401).json({
            message: "Invalid Token"
        });

    }

};


module.exports = authMiddleware;