const CommonRoute = require("./CommonRoute")
const UserController = require("../controllers/UserController")

class UserRoute extends CommonRoute {
  constructor(app) {
    super(UserController, app, "user")
    this.controller = new UserController()
  }

  setupRoutes() {
    super.setupRoutes()
    this.app.post(`/${this.route}/login`, this.controller.login.bind(this.controller))
  }
}

module.exports = (app) => {
  return new UserRoute(app)
}
