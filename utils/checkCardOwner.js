const Card = require("../models/card");


const checkCardOwner = async (req, res, next) => {
    if(req.isAuthenticated())   {
        const card = await Card.findById(req.params.id).exec();
        //check if user owns the card
        //card.owner.id is a mongoose object and not a string and must use mongoose method 
        if(card.owner.id.equals(req.user._id)){
            next();
         }else{
            //else redirect them back to the card
            res.redirect("back");
        }
    } else{ 
        res.redirect("/login");
    }
}

module.exports = checkCardOwner;