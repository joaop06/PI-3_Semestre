const prisma = require('prisma')
const CommonService = require("./CommonService")

class LikesPostUserService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }
}

module.exports = LikesPostUserService
