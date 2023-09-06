const CommonRoute = require("./CommonRoute")
const LikesPostUserController = require("../controllers/LikesPostUserController")

class LikesPostUserRoute extends CommonRoute {
  constructor(app) {
    super(LikesPostUserController, app, "likes-post-user")
  }
}

module.exports = (app) => {
  return new LikesPostUserRoute(app)
}
