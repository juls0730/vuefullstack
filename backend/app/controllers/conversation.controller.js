const db = require("../models");
const User = db.user;

exports.startConversation = (req, res) => {
    const userId = req.userId;
    const partner = req.body.partner;

    User.findById({ _id: userId }, '-password', (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        User.findOne({ username: partner }, '-password', (err, partner) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            const partnerId = partner._id;

            const conversation = new db.conversations({
                participants: [userId, partnerId],
            });

            db.conversations.findOne({ participants: [userId, partnerId] }, (err, existingConversation) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (existingConversation) {
                    res.status(500).send({ message: "conversation already exists" });
                    return;
                }

                conversation.save((err, conversation) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.status(200).send({ conversation });
                });
            });
        });
    });
}

exports.message = (req, res) => {
    const conversationId = req.params.id;
    const messageContent = req.body.message;
    const userId = req.userId;

    db.conversations.findById({ _id: conversationId }, (err, conversation) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (conversation.participants.indexOf(userId) == -1) {
            res.status(401).send({ message: "You are not a participant of this conversation." });
            return;
        }

        const message = new db.messages({
            conversation: conversationId,
            creator: userId,
            content: messageContent,
            sent: new Date(),
        });

        message.save((err, message) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send({ message });
        });
    });
}

exports.getConversation = (req, res) => {
    const conversationId = req.params.id;
    const userId = req.userId;

    db.conversations.findById({ _id: conversationId }, (err, conversation) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (conversation.participants.indexOf(userId) == -1) {
            res.status(401).send({ message: "You are not a participant of this conversation." });
            return;
        }

        db.messages.find({ conversation: conversationId }, (err, messages) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({ messages });
        });
    });
}

exports.getUsersConversations = (req, res) => {
    const userId = req.userId;

    db.conversations.find({ participants: userId }, (err, conversations) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send({ conversations });
    });
}