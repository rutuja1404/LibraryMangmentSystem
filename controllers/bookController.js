const Book = require("../models/Book");
const User = require("../models/User");


// Add Book
exports.addBook = async (req, res) => {
    try {

        const {
            title,
            author,
            category,
            isbn,
            totalCopies
        } = req.body;


        const exist = await Book.findOne({ isbn });

        if (exist) {
            return res.status(400).json({
                message: "ISBN already exists"
            });
        }


        const book = await Book.create({

            title,
            author,
            category,
            isbn,
            totalCopies,
            availableCopies: totalCopies

        });


        res.status(201).json(book);


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};



// Get All Books + Search
exports.getBooks = async (req, res) => {

    try {

        const { title, author, category } = req.query;


        let filter = {};


        if (title) {
            filter.title = {
                $regex: title,
                $options: "i"
            };
        }


        if (author) {
            filter.author = {
                $regex: author,
                $options: "i"
            };
        }


        if (category) {
            filter.category = {
                $regex: category,
                $options: "i"
            };
        }


        const books = await Book.find(filter);


        res.status(200).json(books);


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};



// Get Single Book
exports.getBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);


        if (!book) {

            return res.status(404).json({
                message: "Book Not Found"
            });

        }


        res.status(200).json(book);


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};



// Update Book
exports.updateBook = async (req, res) => {

    try {

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );


        res.status(200).json(book);


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};



// Delete Book
exports.deleteBook = async (req, res) => {

    try {

        await Book.findByIdAndDelete(req.params.id);


        res.status(200).json({

            message: "Book Deleted Successfully"

        });


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};




// Borrow Book
exports.borrowBook = async (req, res) => {

    try {

        const bookId = req.params.id;
        const userId = req.user.id;


        const book = await Book.findById(bookId);


        if (!book) {

            return res.status(404).json({
                message: "Book Not Found"
            });

        }


        if (book.availableCopies <= 0) {

            return res.status(400).json({
                message: "Book Not Available"
            });

        }



        const user = await User.findById(userId);



        const alreadyBorrowed = user.borrowedBooks.find(

            item =>
                item.book.toString() === bookId &&
                item.returnedStatus === false

        );


        if (alreadyBorrowed) {

            return res.status(400).json({

                message: "You already borrowed this book"

            });

        }



        const borrowDate = new Date();


        const dueDate = new Date();

        dueDate.setDate(
            dueDate.getDate() + 7
        );



        user.borrowedBooks.push({

            book: bookId,
            borrowDate,
            dueDate,
            returnedStatus: false

        });



        book.availableCopies -= 1;



        await book.save();

        await user.save();



        res.status(200).json({

            message: "Book Borrowed Successfully",

            book,
            borrowDate,
            dueDate

        });



    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};




// Return Book
exports.returnBook = async (req, res) => {

    try {

        const bookId = req.params.id;

        const userId = req.user.id;



        const user = await User.findById(userId);


        const borrowedBook = user.borrowedBooks.find(

            item =>
                item.book.toString() === bookId &&
                item.returnedStatus === false

        );



        if (!borrowedBook) {

            return res.status(400).json({

                message: "Book not borrowed"

            });

        }



        borrowedBook.returnedStatus = true;



        const book = await Book.findById(bookId);



        book.availableCopies += 1;



        await book.save();

        await user.save();



        res.status(200).json({

            message: "Book Returned Successfully"

        });



    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};





// Available Books
exports.availableBooks = async (req, res) => {

    try {

        const books = await Book.find({

            availableCopies: {
                $gt: 0
            }

        });


        res.status(200).json(books);


    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};




// Unavailable Books
exports.unavailableBooks = async (req, res) => {

    try {

        const books = await Book.find({

            availableCopies: 0

        });


        res.status(200).json(books);


    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};