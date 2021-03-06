const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/v1/auth/signup",
    [
      verifySignUp.checkDuplicate,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/v1/auth/change-password", [authJwt.verifyToken], controller.changePassword);
  app.post("/api/v1/auth/signin", controller.signin);
  app.post("/api/v1/auth/refreshtoken", controller.refreshToken);
  app.post("/api/v1/auth/logout", controller.logout);

  app.get('/api/v1/auth/testtoken', [authJwt.verifyToken], controller.testToken)
};
