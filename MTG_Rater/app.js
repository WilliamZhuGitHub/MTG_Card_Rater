//////////////////////
//IMPORTS
//////////////////////

//Npm imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const flash = require('connect-flash');

//Config imports
try{
    var config = require('./config');
} catch (err) {
    console.log("Could not import config. Not working locally");
    console.log(err);
}
 
//Route imports
const mainRoutes = require('./routes/main');
const cardRoutes = require('./routes/cards');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');
const setRoutes = require('./routes/sets');

//Model imports
const Card = require('./models/card');
const Comment = require('./models/comment');
const User = require('./models/users');

//DEV Tools
var morgan = require('morgan');
app.use(morgan('tiny'));

//Seeding DB
//seed card
// const seed = require('./utils/seed');
//seed();


//seed set
// const seed_sets = require('./utils/seed_sets');
// seed_sets();

//////////////////////
//CONFIG
//////////////////////

//Connect to DB

try{
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
} catch(err){
    console.log("Could not connect using config");
    mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}

//Express config
app.set("view engine", "ejs");
app.use(express.static('public'));

//Express Session
app.use(expressSession({
    secret: process.env.ES_SECRET || config.expressSession.secret,
    resave: false,
    saveUninitalized: false
    
}));

//Body Parser config 
app.use(express.urlencoded({ extended: true }))

//Method Override config
app.use(methodOverride('_method'));

//Connect config
app.use(flash());

//Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

  
// State config
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
})

//Route config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/cards",cardRoutes);
app.use("/cards/:id/comments", commentRoutes);
app.use("/sets", setRoutes);

app.get("*", (req, res) => {
    res.send("404");
});

//Listen
app.listen(process.env.PORT || 3000, () => {
    console.log("App is running on port 3000");
});

 