const CommonService = require('./CommonService')
const prisma = require('../config/prisma')
let error // For error handling

class UserService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName

    // const favoritesListService = new FavoritesListService('FavoritesList')
    // this.favoritesListService = favoritesListService
  }

  async login(user, req, next) {
    try {
      const userLogin = await super.findUnique(next, { where: { email: user.email, password: user.password } })

      // Não autorizado
      if (!userLogin) throw Object.assign(new Error('Credenciais não encontradas ou inexistentes'), { statusCode: 401 })

      delete userLogin.password
      return { message: "Login realizado!", userLogin }

    } catch (e) {
      return next(e)
    }
  }

  async findMany(req) {
    // Mapeia as opções de busca incluindo o relacionamento
    const options = {
      where: {},
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            contentPost: true,
            typePost: true
          }
        }
      }
    }

    // Busca Parcial para o campo `name`
    if (req.query.name) {
      options.where = { name: { contains: req.query.name } };
    }

    // Verifica se a opção `full` é igual a 'false' para excluir informações de relacionamento
    if (req.query.full === 'false') {
      options.include = {}
    }


    const result = await super.findMany(req, options)
    // Remove o campo 'password' do resultado
    result.rows.forEach(user => {
      delete user.password
      return user
    })

    return result
  }

  async create(User, req, next) {
    try {
      const verifyRegister = await super.findMany(req, next, { where: { email: User.email } })

      // ERRO Retorno caso e-mail já cadastrado
      if (verifyRegister.count > 0) throw Object.assign(new Error("E-mail já cadastro"), { statusCode: 409 })


      // Cadastro do Cliente
      const result = await super.create(User, req, next)

      // Cria Lista de Favoritos do Usuário
      await prisma.FavoritesList.create({ data: { userId: result.document.id } })

      return result

    } catch (e) {
      return next(e)
    }
  }

  async delete(id, req, next) {

    // Deleta a Lista de Favoritos do usuário
    try {
      const favoriteListId = await prisma.FavoritesList.findFirst({ where: { userId: id } })
      if (!favoriteListId) throw Object.assign(new Error('Usuário não encontrado'), { statusCode: 404 })

      // Deleta Lista de Fav
      await prisma.FavoritesList.delete({ where: { id: favoriteListId.id } })

    } catch (e) {
      return next(e)
    }


    return await super.delete(id, req, next)
  }
}

module.exports = UserService
