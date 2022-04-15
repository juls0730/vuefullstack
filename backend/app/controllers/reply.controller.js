const db = require("../models");
const User = db.user;
const Reply = db.replies;

exports.createReply = (req, res) => {
  const patern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/
  const reply = new Reply({
    content: req.body.content,
    creator: req.userId,
    postId: req.body.postId
  });

  if (patern.test(reply.content)) {
    reply.save((err, reply) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      let str = reply.content;
      str = str.replace(/\s+/g, '');

      if (str == null || str == "") {
        res.status(500).send({ message: "Content is empty" });
        return;
      }

      res.send(reply);
    });
  } else {
    res.status(500).send({ message: "Invalid reply content" });
    return;
  }
}

exports.findReplyByPostId = (req, res) => {
  Reply.find({ postId: req.params.id }, '-__v').lean().exec(function(err, reply) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    for (let i = 0; i < reply.length; i++) {
      User.findById(reply[i].creator, '-password', (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        reply[i].creator = user.username;

        if (i == reply.length - 1) {
          res.send(reply)
        }
      })
    }
  });
}