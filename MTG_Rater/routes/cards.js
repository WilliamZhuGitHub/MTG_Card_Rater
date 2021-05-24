const express = require('express');
const router = express.Router();

const Card = require('../models/card');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCardOwner = require('../utils/checkCardOwner');

//index
router.get("/", async (req,res) => {
    console.log(req.user);
    try{
        const cards =  await Card.find().exec();
        res.render("cards", {cards});
    } catch (err){
        console.log(err);
        res.send("Error");
    }
 });

 //create
router.post("/",  isLoggedIn, async (req, res) => {
    console.log(req.body);
 
    const newCard = {
        name: req.body.name  ,
        cmc: req.body.cmc  ,
        cardType: req.body.cardType  ,
        subTypes: req.body.subTypes || "",
        attack: req.body.attack || "",
        health: req.body.health || "",
        loyalty: req.body.loyalty || "",
        keywords: req.body.keywords || "",
        description: req.body.description || "",
        image: req.body.image  ,
        owner: {
            id: req.user._id,
            username: req.user.username
        }
    }
    try{
    const card = await Card.create(newCard)
         //console.log(card);
        req.flash("success", "Card Created!");
        res.redirect("/cards/" + card._id);

    } catch(err) {
        req.flash("error", "error creating card");
        //console.log("Error posting", err);
        res.redirect("/cards");
    };

 });

//new
router.get("/new", isLoggedIn, (req, res) => {
    res.render("cards_new");
});

router.get("/new/creature", isLoggedIn, (req, res) => {
    res.render("new_card_forms/cards_new_creature");
});

router.get("/new/land", isLoggedIn, (req, res) => {
    res.render("new_card_forms/cards_new_land");
});

router.get("/new/sorcery", isLoggedIn, (req, res) => {
    res.render("new_card_forms/cards_new_sorcery");
});

router.get("/new/planeswalker", isLoggedIn, (req, res) => {
    res.render("new_card_forms/cards_new_planeswalker");
});


//search
router.get("/search", async (req,res) => {
    try{     
        const cards = await Card.find({
            $text: {
                $search: req.query.term
            }
        })
        res.render("cards", {cards});
    }catch (err) {
        console.log(err);
        res.send("Broken search");
    }
    });

//show
router.get("/:id", async (req,res) => {
    try{
        const card = await Card.findById(req.params.id).exec();
        const comments = await Comment.find({cardID: req.params.id});      
        res.render("cards_show", {card, comments});
    } catch (err){
        console.log("Error Showing", err);
        res.send(err);
    }

})

// edit
router.get("/:id/edit", checkCardOwner, async (req,res) => {
        const card = await Card.findById(req.params.id).exec();
        res.render("cards_edit", {card});
});

//update
router.put("/:id", checkCardOwner, async (req, res) => {
    const card = {
        name: req.body.name,
        cmc: req.body.cmc,
        cardType: req.body.cardType,
        subTypes: req.body.subTypes,
        attack: req.body.attack,
        health: req.body.health,
        loyalty: req.body.loyalty,
        keywords: req.body.keywords,
        description: req.body.description,
        image: req.body.image
    }
    try{
        const updatedCard = await Card.findByIdAndUpdate(req.params.id, card, {new:true}).exec();
         //console.log(updatedCard);
         req.flash("success" , "Card Updated");
        res.redirect(`/cards/${req.params.id}`);
    }catch (err) {
        req.flash("erorr", "error updating card");
        res.redirect("/cards");
       // res.send("Error:" , err);
    }
});


//delete
router.delete("/:id", checkCardOwner, async (req, res) => {
    try{
  const deletedCard = await Card.findByIdAndDelete(req.params.id).exec();
    req.flash("error", "Deleted Card");
    //console.log("Deleted:", deletedCard);
    res.redirect("/cards");
 
    }catch(err) {
        req.flash("error", "Error deleting card");
        req.redirect("back");
      //res.send("Error deleting, Error: ", err);
  }
});


module.exports = router;