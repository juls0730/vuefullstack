const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getUserInfo = (req, res) => {
  User.findById({ _id: req.userId}, '-password -roles').exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ user });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id}, '-password').exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ user });
  });
}