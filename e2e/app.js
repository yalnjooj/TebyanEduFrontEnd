const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cors= require('cors');
const bodyParser = require("body-parser");
const multer = require('multer');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash')
const enumSecure = require('./Tools/enumSecure')



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  
  next();
});



app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials: true
}));



// configure session
app.use(session ({
  secret: enumSecure.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

//configure passport
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

// configure flash
app.use(flash())




app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());






// المسارات الثابتة
app.use(express.static(path.join(__dirname, 'public')));


// دخول الروابط الى السيرفر
app.use('/', require('./Routes/index'));
app.use('/registeration', require('./Routes/registeration'));












module.exports = app;
