const express = require("express");

const router = express.Router();


const {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    availableBooks,
    unavailableBooks
} = require("../controllers/bookController");


const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// Admin Only

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    addBook
);


router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateBook
);


router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteBook
);



// User + Admin

// Get all books + Search
router.get(
    "/",
    authMiddleware,
    getBooks
);


// Get single book
router.get(
    "/:id",
    authMiddleware,
    getBook
);



// Borrow Book
router.post(
    "/:id/borrow",
    authMiddleware,
    borrowBook
);


// Return Book
router.post(
    "/:id/return",
    authMiddleware,
    returnBook
);



// Availability

router.get(
    "/available",
    authMiddleware,
    availableBooks
);


router.get(
    "/unavailable",
    authMiddleware,
    unavailableBooks
);



module.exports = router;