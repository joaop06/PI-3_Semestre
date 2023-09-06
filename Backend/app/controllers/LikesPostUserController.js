const LikesPostUserService = require("../services/LikesPostUserService")
const CommonController = require("./CommonController")

class LikesPostUserController extends CommonController {
  constructor() {
    super(LikesPostUserService, "LikesPostUser")
  }
}

module.exports = LikesPostUserController
