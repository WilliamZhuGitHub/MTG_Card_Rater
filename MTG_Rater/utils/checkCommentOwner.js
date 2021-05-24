const Comment = require("../models/comment");


const checkCommentOwner = async (req, res, next) => {
    if(req.isAuthenticated())  {
        const comment = await Comment.findById(req.params.commentId).exec();
        //check if user owns the comment
        //comment.owner.id is a mongoose object and not a string and must use mongoose method 
        if(comment.user.id.equals(req.user._id)){
            next();
         }else{
            //else redirect them back to the card
            res.redirect("back");
        }
    } else{ 
        res.redirect("/login");
    }
}

module.exports = checkCommentOwner;