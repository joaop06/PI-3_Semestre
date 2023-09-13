const CommonRoute = require("./CommonRoute")
const LikesPostsController = require("../controllers/LikesPostsController")

class LikesPostsRoute extends CommonRoute {
  constructor(app) {
    super(LikesPostsController, app, "likes-posts")
  }
}

module.exports = (app) => {
  return new LikesPostsRoute(app)
}
