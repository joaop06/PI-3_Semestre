const CommonService = require('./CommonService')
// const FavoritesListService = require('./FavoritesListService')
const { FavoritesList } = require('@prisma/client')
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
    const userLogin = await super.findUnique(next, { where: { email: user.email, password: user.password } })

    if (!userLogin) {
      const error = new Error('Credenciais não encontradas ou inexistentes.')
      error.statusCode = 401 // Não autorizado
      return next(error)
    }

    delete userLogin.password
    return { message: "Login realizado!", userLogin }

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

      // Retorno caso e-mail informado já esteja cadastrado
      if (verifyRegister.count > 0) {
        error = new Error("E-mail já cadastro")
        error.statusCode = 409
        return next(error)
      }

      const result = await super.create(User, req, next)


      await prisma.FavoritesList.create({ data: { userId: result.document.id } })

      // Cria uma Lista de Favoritos para o novo Usuário
      // await this.favoritesListService.create({ userId: result.document.id }, req, next)

      return result

    } catch (e) {
      console.error(e)
      error = new Error('Erro ao registrar usuário!')
      error.statusCode = 400
      return next(error)
    }
  }

  async delete(id, req, next) {

    // Deleta a Lista de Favoritos do usuário
    try {
      // Nova instância FavoritesList
      this.favoritesListService = new FavoritesListService('FavoritesList')
      await this.favoritesListService.delete({}, req, next, { where: { userId: id } })

    } catch (error) {
      return next(new Error('Erro ao deletar Lista de Favoritos'))
    }

    return await super.delete(id, req, next)
  }
}

module.exports = UserService
