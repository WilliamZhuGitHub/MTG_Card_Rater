const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');



//Sign up new
router.get('/signup', (req,res) => {
    res.render("signup");
});

//Sign up create
router.post('/signup', async (req,res) => {
    try{
        const newUser = await User.register(new User({
            username: req.body.username,
            email: req.body.email
        }), req.body.password);

        //console.log(newUser);
        req.flash("success", `Signed you up as ${newUser.username}`);
        passport.authenticate('local')(req, res, () =>{
            res.redirect('/cards');
        });

    }catch (err) { 
        console.log(err);
        res.send(err);
    }
 });

//login show form
router.get('/login', (req,res) => {
    res.render("login");
});

//login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/cards',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: "Logged in successfully!"
}));

//logout
router.get('/logout', (req,res) => {
    req.logout();
    req.flash("success", "Logged out successfully!");
    res.redirect('/cards');
 });

module.exports = router;