const { authJwt } = require("../middlewares");
const controller = require("../controllers/conversation.controller");

module.exports = function (app) {
    app.post("/api/v1/conversation", [authJwt.verifyToken], controller.startConversation);
    app.post("/api/v1/conversation/:id", [authJwt.verifyToken], controller.message);
    app.get("/api/v1/conversation/:id", [authJwt.verifyToken], controller.getConversation);
    app.get("/api/v1/conversations", [authJwt.verifyToken], controller.getUsersConversations);
}