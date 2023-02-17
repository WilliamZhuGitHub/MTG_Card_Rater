const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({ 
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    text: String,
    cardID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }

});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;