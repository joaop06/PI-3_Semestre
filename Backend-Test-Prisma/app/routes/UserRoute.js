const CommonRoute = require("./CommonRoute")
const UserController = require("../controllers/UserController")

class UserRoute extends CommonRoute {
  constructor(app) {
    super(UserController, app, "user")
  }
}

module.exports = (app) => {
  return new UserRoute(app)
}
