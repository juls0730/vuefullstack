const { authJwt } = require("../middlewares");
const controller = require("../controllers/reply.controller");

module.exports = function(app) {
    app.get("/api/v1/post/:id/comments", controller.findReplyByPostId);
    app.post("/api/v1/post/reply", [authJwt.verifyToken], controller.createReply);
}