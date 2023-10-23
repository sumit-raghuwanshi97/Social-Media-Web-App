const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');

if(process.env.NODE_ENV !== "production"){
require("dotenv").config({path:"backend/config/config.env"});
} 

//Using  Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieparser());

//importing routes 
const post = require('./routes/post');
const user = require('./routes/user');

//using routes
app.use('/api/v1' , post);
app.use('/api/v1' , user); 

app.get('/',(req,res) => {res.send("you are now connected to backend of our social media app")});

module.exports = app;
