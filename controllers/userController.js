const User = require("../models/User");


// Get Borrow History
exports.getHistory = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .populate("borrowedBooks.book");


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        const history = user.borrowedBooks.map(item => ({

            book: item.book,

            borrowDate: item.borrowDate,

            dueDate: item.dueDate,

            returnedStatus: item.returnedStatus

        }));


        res.status(200).json({

            message: "Borrow History",

            history

        });


    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};