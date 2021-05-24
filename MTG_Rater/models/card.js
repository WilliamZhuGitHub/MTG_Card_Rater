const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({ 
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
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }

});

cardSchema.index({
    '$**': 'text'
});

const Card = mongoose.model("card", cardSchema);
module.exports = Card;