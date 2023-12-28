const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//let users = []

//Function to check if the user exists
const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
    const username=req.body.username
    const password=req.body.password
    if(username && password){
        if (!doesExist(username)) { 
            users.push({"username":username,"password":password});
           // res.send(users);
            return res.status(200).json({message: "User successfully registred. Now you can login"});
          } else {
            return res.status(404).json({message: "User already exists!"});    
          }
}
    else{
        res.send("Please provide username and password.")
}
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //res.send(JSON.stringify(books,null,8));
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books,null,8))
    },1000)})

    myPromise1.then((successMessage) => {
        res.send(successMessage)
      })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn=req.params.isbn;
  let myPromise2 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books[isbn])
    },1000)})

    myPromise2.then((successMessage) => {
        res.send(successMessage)
      })
  //res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let index=0;
   /*for(let i in books) { 
      if(books[i].author===author)
      {
        res.send(books[i]) 
      }
   }; return*/
   let myPromise3 = new Promise((resolve,reject) => {
    setTimeout(() => {
        var word= [];
        for(let i in books) { 
            if(books[i].author===author)
            {
                word[index]=books[i];
                index++;
            }
         };
         resolve(word) 
      //resolve(books[isbn])
    },1000)})

    myPromise3.then((successMessage) => {
        res.send(successMessage)
      })
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let index=0;
    /*for(let i in books) { 
       if(books[i].title===title)
       {
         res.send(books[i]) 
       }
    }; 
    return*/

    let myPromise4 = new Promise((resolve,reject) => {
        setTimeout(() => {
            var word= [];
            for(let i in books) { 
                if(books[i].title===title)
                {
                    word[index]=books[i];
                    index++;
                }
             };
             resolve(word) 
          //resolve(books[isbn])
        },1000)})
    
        myPromise4.then((successMessage) => {
            res.send(successMessage)
          })
 
  
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
  
});

module.exports.general = public_users;


