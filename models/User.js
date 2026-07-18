const mongoose = require("mongoose");

const borrowedBookSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },

    borrowDate: {
        type: Date,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    returnedStatus: {
        type: Boolean,
        default: false
    }
});


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"

    },

    borrowedBooks: [borrowedBookSchema]

});


module.exports = mongoose.model("User", userSchema);