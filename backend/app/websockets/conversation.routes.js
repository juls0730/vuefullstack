const db = require("../models");
const jwt = require("jsonwebtoken");
const { authJwt } = require("../middlewares");
const config = require("../config/auth.config.js");

module.exports = function (io) {
    io.on("connection", (socket) => {
        socket.isAlive = true;
        console.log("Socket is connected...")
        socket.on("message", (data) => {
            message = JSON.stringify(data);

            if (!data.conversationId) {
                console.log("No conversationId");
                return;
            }

            if (!data.content) {
                console.log("No message");
                return;
            }

            if (!data.creator) {
                console.log("No creator");
                return;
            }

            let tokentoVerify = data.creator;
            if (!tokentoVerify) {
                return "No token provided!";
            }

            jwt.verify(tokentoVerify, config.secret, (err, decoded) => {
                if (err) {
                    return "Unauthorized!";
                }


                global.userId = decoded.id;
                console.log(decoded.id)
            });

            db.conversations.findById({ _id: data.conversationId }, (err, conversation) => {
                userId = global.userId
                if (err) {
                    console.log(err);
                    return;
                }

                if (!conversation) {
                    console.log("No conversation");
                    return;
                }

                if (!userId) {
                    console.log("No userId");
                    console.log(userId);
                    return;
                }

                if (conversation.participants.indexOf(userId) == -1) {
                    console.log("You are not a participant of this conversation.");
                    return;
                }

                const message = new db.messages({
                    content: data.content,
                    conversation: data.conversationId,
                    creator: userId,
                    sent: new Date(),
                });

                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(message);

                    io.emit("channel-" + data.conversationId, message);
            });
        });
        socket.on("typing", (data) => {
            socket.emit("typing-" + data.conversationId, data.creator);
            console.log("typing-" + data.conversationId);
        });

        socket.on("nottyping", (data) => {
            socket.emit("nottyping-" + data.conversationId, data.creator);
            console.log("nottyping-" + data.conversationId);
        })
    })
}