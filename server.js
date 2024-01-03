const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// const uri = 'mongodb://localhost:27017/userData'
// const uri = 'mongodb://localhost:27017';

//********** USE CONTAINER NAME WHEN BUILD WITH DOCKER!!!!!! ************//
const uri = 'mongodb://db_container:27017';

mongoose
    .connect(uri, {
      dbName: process.env.DB_NAME,
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
    })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log(`THIS HAHA ${err.message}`));

// first page
// app.use("/", (req, res) => {
//   res.json({ message: "Welcome to User Database." });
// });

// All routes
const userRoute = require('./routes/user_route');
app.use("/userData", userRoute);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});