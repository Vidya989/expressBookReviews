const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    if(username)
    return true;
    else
    return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
if(username==="Vidya" && password==="1234")
{
    return true;
}
else 
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
   // res.send("In login page")
    if(isValid(req.body.username) && authenticatedUser(req.body.username,req.body.password))
     res.send("User logged In")
    else
    res.send("Invalid username or password")
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
