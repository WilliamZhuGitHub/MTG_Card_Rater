 const fetch = require('node-fetch');
 const ScryfallCard = require('../models/scryfall_card');

var scryfall_card_seed = [];
const seed_sets = async() => {

    // await ScryfallCard.deleteMany();
    // console.log("Cleared Database")

    //https://api.scryfall.com/cards/search?order=rarity&q=e%3A<INSERT SET NAME>&unique=prints 
    try{
        //timeout as to not spam the api 
        setTimeout(
            function pullData() { 
                //fetch from the api, converts the text to json, 
                //pushes data from the json into an object into scryfall_card_seed
                 fetch("https://api.scryfall.com/cards/search?format=json&include_extras=false&include_multilingual=false&order=rarity&page=3&q=e%3Aznr&unique=prints")
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    return (response.data);
                })
                .then((response) => {
                    var i;
                    for (i = 0; i < response.length; i++) {
                        var imageLink;
                        try{
                          imageLink = response[i].image_uris.normal
                        }catch(err){     
                        }
                        try{
                            imageLink = response[i].card_faces[0].image_uris.normal
                        }catch(err){
                        }
 
                        scryfall_card_seed.push(
                            {
                            name: response[i].name,
                            cmc: response[i].mana_cost,
                            cardType: response[i].type_line,
                            subTypes: "",
                            attack: response[i].power,
                            health: response[i].toughness,
                            loyalty: "",
                            keywords: "",
                            description: response[i].oracle_text,
                            image: imageLink,
                            set: response[i].set,
                            rarity: response[i].rarity
                            }
                        )
                    }
                })
                .then(() => {
                    //console.log(scryfall_card_seed[0].name);
                    var start;
                    for (start = 0; start < scryfall_card_seed.length; start++) {
                    let card = ScryfallCard.create(scryfall_card_seed[start]);
                    //console.log("Created a new Card: " , card.name)     
                    }     
                    console.log("Seeded");
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        , 1000);
    }catch (err){
        console.log(err);
    }
}

module.exports = seed_sets;