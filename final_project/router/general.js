const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let username=req.body.username
    let password=req.body.password
    if(username && password){
         res.send("User Registered.")
         //books[11]={"username":username, "password":password}
         //users[1].push({"username":username, "password":password});
}
    else{
        res.send("Please provide username and password.")
}
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,8));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn=req.params.isbn;
  res.send(books[isbn])
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
 //const author=req.params.author;
 //res.send('Hi')
 //let filtered_author= books.filter((book)=>book.author===author);
//res.send(filtered_author)
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn=req.params.isbn;
  const data=books[isbn];
  if(data)
  {
      res.send(data.reviews)
  }
  else{
      res.send("Book not found")
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
