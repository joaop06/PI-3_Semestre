const prisma = require('prisma')
const CommonService = require("./CommonService")
const PostService = require('./PostService')

class FavoritesListService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName

    const postService = new PostService('Post')
    this.postService = postService
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

  async update(favoritesList, req, next) {
    const { id: listId, favorite } = req.query

    if (!listId) {
      const error = new Error('ID de Lista de Favoritos não informado')
      error.statusCode = 400
      return next(error)
    }

    if (['false', 'true'].includes(favorite)) {
      const listUpdate = {}
      const postUpdate = {}

      if (favorite === 'true') {
        listUpdate.push = ''
        postUpdate.push = favoritesList.postsFavoritesId[0] // Add ID do Usuário
      }
      if (favorite === 'false') {
        // Encontra a Publicação a ser Atualizada
        const findPost = await super.findUnique(next, { where: { id: favoritesList.postsFavoritesId[0] } })
        if (!findPost) {
          const error = new Error('Postagem não encontrada')
          error.statusCode = 404
          return next(error)
        }
        listUpdate
        postUpdate.set = findPost[0].favoritesListId.filter(id => id !== favoritesList.favoritesListId[0]) // Remove ID da Lista de Favoritos
      }

      await this.postService.update({
        where: { id: favoritesList.postsFavoritesId[0] },
        data: {
          postsLikedID: {
            ...userUpdate
          }
        }
      })

      return await super.update({
        where: { id: listId },
        data: {
          postsFavoritesId: {
            ...postUpdate // Adicione aqui o ID do usuário a ser adicionado à matriz
          }
        }
      })
    }

    return await super.update(favoritesList, req, next)

  }
}

module.exports = FavoritesListService
