const prisma = require('prisma')
const CommonService = require("./CommonService")


class PostService extends CommonService {
  constructor(modelName, models) {
    super(modelName, models)
    this.modelName = modelName
    this.models = models
  }


}

module.exports = PostService
