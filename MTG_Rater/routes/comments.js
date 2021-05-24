const express = require('express');
const router = express.Router({mergeParams: true});

const Card = require('../models/card');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner');


//show
router.get("/new", isLoggedIn, (req,res) => {
    res.render("comments_new", {cardID: req.params.id})
});


//create 
router.post("/", isLoggedIn, async (req,res)  => {
    // res.send("Hit the create comment route");
    //Create the comment
    try{
        const newComment = await Comment.create({
            user: {
                id: req.user._id,
                username: req.user.username
            },
            text: req.body.text,
            cardID: req.body.cardID
        });
            //console.log(newComment);
            req.flash("success", "Comment created");
            res.redirect(`/cards/${req.body.cardID}`)

    }catch (err){ 
        //console.log(err)
        req.flash("error", "Error creating comment");
        res.redirect(`/cards/${req.body.cardID}`)
    }
});


//edit 
router.get("/:commentId/edit", checkCommentOwner, async (req,res) =>{
    try{
        const card = await Card.findById(req.params.id).exec();
        const comment = await Comment.findById(req.params.commentId).exec();
        // console.log("Card: ", card);
        // console.log("Comment: ", comment);
        res.render("comments_edit", {card, comment});
    } catch (err) {
        console.log(err);
        res.send("Broke comment");
    }
});

//update
router.put("/:commentId", checkCommentOwner, async (req,res) => {
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
        //console.log(comment);
        req.flash("success", "Comment updated");
        res.redirect(`/cards/${req.params.id}`);
    }catch (err) {
        console.log(err);
        req.flash("error", "Error could not update comment");
        res.redirect(`/cards/${req.params.id}`);
     }
});

//delete 
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
    try{
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        req.flash("success", "Comment deleted");
        res.redirect(`/cards/${req.params.id}`);
    } catch (err) {
        req.flash("error", "Error could not delete comment");
        res.send("Broken Comment");
    }
});

module.exports = router;