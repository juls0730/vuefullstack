const mongoose = require("mongoose");
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
    likes: Number,
    img:
    {
        data: String,
        contentType: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  })
);
module.exports = Post;
