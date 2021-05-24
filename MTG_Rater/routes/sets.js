const express = require('express');
const router = express.Router();

const ScryfallCard = require('../models/scryfall_card');
const Comment = require('../models/comment');

const fetch = require('node-fetch');

//seed the cards into the database(DO NOT RUN EVERY TIME)
 
//view card
router.get("/view/:id", async (req,res) => {
    try{
        const card = await ScryfallCard.findById(req.params.id).exec();
        const comments = await Comment.find({cardID: req.params.id});      
        res.render("sets_show", {card, comments});
    } catch (err){
        console.log("Error Showing", err);
        res.send(err);
    }
})

 //search
 router.get("/:setID/search", async (req,res) => {
    const setName = `${req.params.setID}`;

    try{     
        const cards = await ScryfallCard.find({
            $text: {
                $search: req.query.term
            },
            set: `${req.params.setID}`
        })
        res.render("sets", {cards , setName});
    }catch (err) {
        console.log(err);
        res.send("Broken search");
    }
    });



//return set cards
router.get("/:setID", async (req,res) => {
    //console.log(req.user);
    const setName = `${req.params.setID}`;
    try{
        const cards =  await ScryfallCard.find({set: `${req.params.setID}`}).exec();
        res.render("sets", {cards, setName} );
    } catch (err){
        console.log(err);
        res.send("Error");
    }
 });




module.exports = router;