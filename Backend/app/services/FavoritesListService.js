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

  async update(favoritesList, req, next) {

    // Encontra a Publicação a ser Atualizada
    const findUser = await this.userService.findUnique(next, { where: { id: Post.usersLikeID[0] } })
    const findPost = await super.findUnique(next, { where: { id: postId } })


    // Objeto com parâmetros para update (Adicionar ou remover curtida)
    const userUpdate = {}
    const postUpdate = {}

    userUpdate.push = [postId] // Add ID da Publicação
    postUpdate.push = Post.usersLikeID[0] // Add ID do Usuário

    userUpdate.set = findUser[0].postsLikedID.filter(id => id !== postId) // Remove ID da Publicação
    postUpdate.set = findPost[0].usersLikeID.filter(id => id !== Post.usersLikeID[0]) // Remove ID do Usuário



    // Atualiza no registro do usuário, removendo a curtida
    await this.userService.update({
      where: { id: Post.usersLikeID[0] },
      data: {
        postsLikedID: {
          ...userUpdate
        }
      }
    })

    // Atualiza a postagem com a nova quantidade de curtidas
    return await super.update({
      where: { id: postId },
      data: {
        usersLikeID: {
          ...postUpdate // Adicione aqui o ID do usuário a ser adicionado à matriz
        }
      }
    })

    return await super.update(favoritesList, req, next)

  }
}

module.exports = FavoritesListService
