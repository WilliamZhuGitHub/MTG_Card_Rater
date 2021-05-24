const mongoose = require("mongoose");

const scryfallCardSchema = new mongoose.Schema({ 
    name: String,
    cmc: String,
    cardType: String,
    subTypes: String, //array
    attack: String,
    health: String, 
    loyalty: String,
    keywords: String, //array
    description: String,
    image: String,
    set: String,
    rarity: String
});

scryfallCardSchema.index({
    '$**': 'text'
});

const ScryfallCard = mongoose.model("scryfallCard", scryfallCardSchema);
module.exports = ScryfallCard;