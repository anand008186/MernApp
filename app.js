const express = require('express');
const app = express();
const mongoose =require('mongoose');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');

dotenv.config({path:'./config.env'})
require('./db/conn');
// const User = require('./db/userschema');
app.use(cookieParser());
app.use(express.json()) ;
// Linking our router file for making router
app.use(require('./router/auth'));


if (process.env.NODE_ENV = "production"){
    app.use(express.static("client/build"));
}


const PORT = process.env.PORT || 5000;   


app.listen( PORT, ()=>{
    console.log(` the server is running at port no. ${PORT}`)
});