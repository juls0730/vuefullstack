const mongoose = require("mongoose");
const Reply = mongoose.model(
    "Reply",
    new mongoose.Schema({
        content: String,
        creator: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    })
  );
  module.exports = Reply;
  