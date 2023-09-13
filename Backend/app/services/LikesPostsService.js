const prisma = require('prisma')
const CommonService = require("./CommonService")

class LikesPostsService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }
}

module.exports = LikesPostsService
