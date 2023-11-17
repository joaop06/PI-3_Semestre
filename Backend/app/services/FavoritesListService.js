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

  async update(object, req, next) {
    try {
      const { id: userId, favorite } = req.query

      // ERRO Caso ID de Usuário não informado
      if (!userId) throw Object.assign(new Error('Usuário não informado'), { statusCode: 400 })


      // Atualizar de Post na Lista de Favoritos (Adicionar ou Remover)
      if (![null, undefined].includes(favorite) && object.postsFavoritesId) {
        this.postService = new PostService('Post') // Nova Instância PostService

        // Encontra a Publicação a ser Atualizada
        const post = await this.postService.findUnique(next, { where: { id: object.postsFavoritesId[0] } })
        const favoritesList = await super.findUnique(next, { where: { userId: userId } })

        // ERRO Lista não encontrada
        if (!favoritesList) throw Object.assign(new Error('Lista de Favoritos não encontrada'), { statusCode: 404 })


        const listUpdate = {}
        const postUpdate = {}

        // Adicionar Postagem a Lista de Favoritos (usando `push`, parâmetro do Mongo)
        if (favorite === 'true') {

          let verifyFavorite = await super.findUnique(next, { where: { id: favoritesList.id } })
          verifyFavorite = verifyFavorite.postsFavoritesId.find(favorite => favorite === object.postsFavoritesId[0])

          // ERRO Caso já tenha favoritado
          if (verifyFavorite) throw Object.assign(new Error('Postagem já favoritada nessa lista'), { statusCode: 409 });


          listUpdate.push = object.postsFavoritesId[0] // Add ID da Postagem
          postUpdate.push = favoritesList.id
        }

        // Remover Postagem da Lista de Favoritos
        if (favorite === 'false') {
          listUpdate.set = favoritesList.postsFavoritesId.filter(id => id !== favoritesList.postsFavoritesId[0])
          postUpdate.set = post.favoritesListId.filter(id => id !== favoritesList.id) // Remove ID da Lista de Favoritos
        }

        // Atualiza a Postagem 
        await this.postService.directUpdate({
          where: { id: object.postsFavoritesId[0] },
          data: {
            favoritesListId: {
              ...postUpdate
            }
          }
        }, next)

        // Atualiza a Lista de Favoritos
        return await super.update({
          where: { id: favoritesList.id },
          data: {
            postsFavoritesId: {
              ...listUpdate // Adicione aqui o ID do usuário a ser adicionado à matriz
            }
          }
        })
      }

      // Caso não entre na alteração de Favoritos
      if (object.postsFavoritesId) delete object.postsFavoritesId


      return await super.update(favoritesList, req, next)

    } catch (e) {
      return next(e)
    }
  }
}

module.exports = FavoritesListService
