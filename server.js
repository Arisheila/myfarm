const express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  passport = require('passport');
require('dotenv').config();


// Express Session
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
});

// Models
//  Userlogin = require("./models/Userlogin"),

// Routes
// const homeroutes = require("./routes/homeroutes"),
 const registeroutes = require("./routes/registeroutes");
 const loginRoutes = require("./routes/loginroutes");
 const dashboard =require('./routes/dashboard');
 const managerlist =require('./routes/managerlist')
 const productRoutes =require('./routes/productroutes')
 const productlist =require('./routes/productroutes')
 



 const Manager =require('./models/Manager')
//  userRoutes = require("./routes/userroutes");

// Database
const config = require('./config/database');

//Initialising server, the variable server can be named anything and be used like that throughout the calling in the routes file 
const server = express();

// Mongoose Set up
//connect mongoose
mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
// Check connection
db.once('open', function () {
  console.log('Connected to MongoDB');
});
// Check for db errors
db.on('error', function (err) {
  console.error(err);
});

// Setting view Engine.
server.set('view engine', 'pug');
server.set('views', './views');

// Express Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(expressSession);

server.use(passport.initialize());
server.use(passport.session());


passport.use(Manager.createStrategy());
passport.serializeUser(Manager.serializeUser());
passport.deserializeUser(Manager.deserializeUser());

//this is for when the user hasnt logined in cant access their portal
const loginchecker = function(req,res,next){
  if (req.path != '/login' && req.path != '/register' && !req.session.user){
    res.redirect('/register')
  }
  next()

}
server.use(loginchecker)

// Routing
server.use('/dashboard', dashboard);
server.use('/', loginRoutes);
server.use('/register', registeroutes);
server.use('/login', loginRoutes);
server.use('/managers', managerlist);
server.use('/products',productRoutes);
server.use('/productlist', productRoutes);
server.use('/', productRoutes);

// Non Existing Routes and Server Port
// handling non existing routes
server.get('*', (req, res) => {
  res.status(404).send('OOPS! WRONG ADDRESS');
});

// server
server.listen(3002, () => console.log('Listening on Port 3002'));


