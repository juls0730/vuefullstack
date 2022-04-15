const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function(app) {
    app.get("/api/v1/posts", controller.getAllPosts);
    app.get("/api/v1/posts/:id", controller.getOnePost);
    app.post("/api/v1/post", [authJwt.verifyToken], controller.createPost);
    app.get("/api/v1/post/find/:query", controller.findPost);
}