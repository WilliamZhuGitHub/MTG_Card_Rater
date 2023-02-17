
const Card = require('../models/card');
const Comment = require('../models/comment');

const card_seeds = [
    {
      name: "Rotting Regisaur",
      cmc: "2B",
      cardType: "Creature",
      subTypes: "Zombie Dinosaur",
      attack: 7,
      health: 6,
      loyalty: "",
      keywords: "",
      description: "At the beginning of your upkeep, discard a card",
      image: "https://img.redbull.com/images/c_fill,w_320,h_447,g_auto,f_auto,q_auto/redbullcom/2019/07/31/6adeb860-451b-4f06-98a8-408bf4f212af/rotting-regisaur-magic-the-gathering"
    },
    {
        name: "Ugin, the Spirit Dragon", 
        cmc: "8",
        cardType: "Legendary Planeswalker",
        subTypes: "Ugin",
        attack: "",
        health: "",
        loyalty: 7,
        keywords: "",
        description: "+2: Ugin the Spirit Dragon deals 3 damage to any target. -X: Exile each permanent with converted mana cost X or less that's one or more colors. -10: You gain 7 life, draw 7 cards, then put up to seven permanent cards from your hand onto the battlefield.",
        image: "https://cdn1.dotesports.com/wp-content/uploads/2020/06/05104820/M21-Ugin-The-Spirit-Dragon-MTG.jpg"
      },
      {
        name: "Evolving Wilds",
        cmc: "",
        cardType: "Land",
        subTypes: "",
        attack: "",
        health: "",
        loyalty: "",
        keywords: "",
        description: "Tap, Sacrifice Evolving Wilds: Search  your library for a basici land card, put it onto the battlefield tapped, then shuffle your library.",
        image:  "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.WqA8~2eefa/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2020/11/Magic-The-Gathering-Secret-Lair-Bob-Ross-11.jpg"
      }
]

const seed = async() => {
// Delete all the current cards and comments

    await Card.deleteMany();
    console.log("Cleared Database")

//create three new cards
// try{
//     for (const newCard of card_seeds){
//         let card = await Card.create(newCard);
//         console.log("Created a new Card: " , card.name)
//         await Comment.create(
//             {
//             text: "Good card",
//             user: "MTG Johnny",
//             cardID: card._id
//         }
//         )
//         //create a comment for each card 
//         console.log("Created a new Comment " , Comment.user)

//     }
//   }catch(err){
//     console.log(err);
//     res.send("Error");
//   }
}


module.exports = seed;