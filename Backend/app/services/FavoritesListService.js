const CommonService = require("./CommonService")
const PostService = require('./PostService')


class FavoritesListService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }

  async findMany(req, next, options) {

    // Mapeia as opções de busca incluindo o relacionamento
    options ? options.where = {} : options = { where: {} }
    options.include = {
      user_id: {
        select: {
          id: true,
          name: true,
          email: true,
          isAdmin: true
        }
      },
      posts: true
    }

    if (req.query.favorite) delete req.query.favorite

    const result = await super.findMany(req, next, options)

    // Remove alguns Atributos desnecessários do relacionamento
    result.rows.forEach(favoriteList => {
      favoriteList.posts.forEach(favoritesPosts => {
        delete favoritesPosts.contentPost
        delete favoritesPosts.usersLikeID
        delete favoritesPosts.favoritesListId
        delete favoritesPosts.createAt
        delete favoritesPosts.updateAt

        return favoritesPosts
      })

      return favoriteList
    })

    return result
  }

  async update(favoritesList, req, next) {
    const { id: listId, favorite } = req.query

    if (!listId) {
      const error = new Error('ID de Lista de Favoritos não informado')
      error.statusCode = 400
      return next(error)
    }

    if (favorite) {
      // Nova Instância PostService
      this.postService = new PostService('Post')

      // Encontra a Publicação a ser Atualizada
      const findPost = await this.postService.findUnique(next, { where: { id: favoritesList.postsFavoritesId[0] } })
      const findFavoritesList = await super.findUnique(next, { where: { id: listId } })
      if (!findFavoritesList) {
        const error = new Error('Lista de Favoritos não encontrada')
        error.statusCode = 404
        return next(error)
      }


      const listUpdate = {}
      const postUpdate = {}

      // Adicionar Postagem a alguma lista de favoritos
      if (favorite === 'true') {
        postUpdate.push = [listId]
        listUpdate.push = favoritesList.postsFavoritesId[0] // Add ID da Postagem
      }

      // Remover Postagem da Lista de Favoritos
      if (favorite === 'false') {
        postUpdate.set = findPost[0].favoritesListId.filter(id => id !== listId) // Remove ID da Lista de Favoritos
        listUpdate.set = findFavoritesList[0].postsFavoritesId.filter(id => id !== favoritesList.postsFavoritesId[0])
      }

      // Atualiza as listas de favoritos da Postagem 
      await this.postService.directUpdate({
        where: { id: favoritesList.postsFavoritesId[0] },
        data: {
          favoritesListId: {
            ...postUpdate
          }
        }
      })

      // Atualiza a Lista de Favoritos com a nova postagem
      return await super.update({
        where: { id: listId },
        data: {
          postsFavoritesId: {
            ...listUpdate // Adicione aqui o ID do usuário a ser adicionado à matriz
          }
        }
      })
    }

    return await super.update(favoritesList, req, next)
  }
}

module.exports = FavoritesListService
