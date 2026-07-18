# LibraryMangmentSystem

Library Management System (Backend)

A RESTful backend application developed using Node.js, Express.js, MongoDB, and Mongoose following the MVC (Model View Controller) Architecture.

This project includes user authentication, role-based authorization, book management, borrowing and returning books, borrow history, book search, and availability filtering.


---

Features

Authentication

User Registration

User Login

Password Hashing using bcrypt

JWT Authentication

Role-Based Authorization (Admin/User)



---

Book Management

Admin

Add Book

Update Book

Delete Book


Admin & User

View All Books

View Single Book



---

Borrow & Return Books

Borrow a Book

Return a Book

Prevent duplicate borrowing

Automatically decrease available copies when borrowing

Automatically increase available copies when returning

Store Borrow Date and Due Date

Track Returned Status



---

Borrow History

View Borrow History

Book Details using populate()

Borrow Date

Due Date

Returned Status



---

Search & Filter

Search Books by Title

Search Books by Author

Search Books by Category

View Available Books

View Unavailable Books



---

Validation

Required Field Validation

Duplicate Email Validation

Duplicate ISBN Validation

Book Availability Validation

Proper Error Handling

Appropriate HTTP Status Codes



---

Technologies Used

Node.js

Express.js

MongoDB

Mongoose

JWT (JSON Web Token)

bcrypt

dotenv



---

Project Structure

Library-Management-System/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── models/
│   ├── User.js
│   └── Book.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── userRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md


---

Installation

1. Clone the Repository

git clone <repository-url>

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Start the Server

npm run dev

or

nodemon server.js


---

API Endpoints

Authentication

Method	Endpoint	Description

POST	/api/auth/register	Register User
POST	/api/auth/login	Login User



---

Book Management

Method	Endpoint	Description

POST	/api/books	Add Book (Admin)
GET	/api/books	Get All Books
GET	/api/books/:id	Get Single Book
PUT	/api/books/:id	Update Book (Admin)
DELETE	/api/books/:id	Delete Book (Admin)



---

Borrow & Return

Method	Endpoint	Description

POST	/api/books/:id/borrow	Borrow Book
POST	/api/books/:id/return	Return Book
GET	/api/user/history	View Borrow History



---

Search Books

Method	Endpoint	Description

GET	/api/books/search?title=node	Search by Title
GET	/api/books/search?author=robert	Search by Author
GET	/api/books/search?category=science	Search by Category



---

Book Availability

Method	Endpoint	Description

GET	/api/books/available	View Available Books
GET	/api/books/unavailable	View Unavailable Books



---

HTTP Status Codes

Status Code	Meaning

200	Success
201	Created
400	Bad Request
401	Unauthorized
403	Forbidden
404	Not Found
500	Internal Server Error



---

API Testing

Use Postman or Thunder Client to test all APIs.

Testing Order

1. Register User


2. Login User


3. Copy JWT Token


4. Add Book (Admin)


5. View All Books


6. Borrow Book


7. View Borrow History


8. Return Book


9. View Borrow History Again


10. Search by Title


11. Search by Author


12. Search by Category


13. View Available Books


14. View Unavailable Books




---

Expected Learning Outcomes

Build RESTful APIs using Express.js

Implement JWT Authentication and Role-Based Authorization

Perform CRUD Operations with MongoDB

Implement real-world Borrow and Return Book functionality

Work with Nested Documents

Use populate() for referenced documents

Use req.query for searching

Apply MongoDB filtering and comparison operators

Handle validations and proper error responses

Follow the MVC Architecture



---

Author
Rutuja chougule
Library Management System (Backend)
Backend Practice Project using Node.js, Express.js, MongoDB, and Mongoose.
