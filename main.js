require('dotenv').config();
const port=3000;
const express = require('express');
const {connectmongodb}=require("./connection")
const router=require('./router/routers');
const path = require("path");
const session = require('express-session');
const app = express();
app.use(session({
  secret: 'your-secret-key', 
  resave: false,  
  saveUninitialized: true  
})); 
connectmongodb("mongodb+srv://sunilpujari3846:yQ7OSbJrC8DJxu6f@cluster0.m3cvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
app.use(express.static(path.join(__dirname, 'public')));  // Middleware for serving static files
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({extended: false})) // Middleware for parsing URL encoded data
app.set("view engine", "ejs");  
app.set("views", path.resolve("./view"));   
  

app.use('/perso_test',router);


app.listen(port, () => {
  console.log(`Server running on port ${port}`); 
});  
 