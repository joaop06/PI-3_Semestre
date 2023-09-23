const prisma = require('prisma')
const CommonService = require("./CommonService")

class FavoritesListService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }
}

module.exports = FavoritesListService
