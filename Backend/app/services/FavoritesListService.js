const prisma = require('prisma')
const CommonService = require("./CommonService")

class FavoritesListService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }

  async findMany(req) {

    // Mapeia as opções de busca incluindo o relacionamento
    let options = {
      where: {},
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true
          }
        },
        posts: {
          user_id: true,
          title: true,
          contentPost: true,
          typePost: true
        }
      }
    }

    return await super.findMany(req, options)
  }

  async update() {

    return await super.update()
  }
}

module.exports = FavoritesListService
