const prisma = require('prisma')
const CommonService = require('./CommonService')
const FavoritesListService = require('./FavoritesListService')

class UserService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName

    const favoritesListService = new FavoritesListService('FavoritesList')
    this.favoritesListService = favoritesListService
  }

  async findMany(req) {
    // Mapeia as opções de busca incluindo o relacionamento
    let options = {
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
    if (Object.keys(req.query).length !== 0 && req.query?.name) {
      options.where = { name: { contains: req.query.name } }
    }

    // Caso seja passado full=false, será desconsiderado as informações do relacionamento
    if (req.query.full === 'false') {
      options.include = {}
    }

    return await super.findMany(req, options)
  }

  async create(User, req, next) {
    const verifyRegister = await super.findMany(req, next, { where: { email: User.email } })

    // Retorno caso e-mail informado já esteja cadastrado
    if (verifyRegister.count > 0) return { statusCode: 409, message: "E-mail já cadastro" }

    const result = await super.create(User, req, next)

    if (!result) {
      const error = new Error('Erro ao registrar usuário!')
      error.statusCode = 400
      return next(error)
    }

    // Cria uma lista de favoritos para o usuário assim que é registrado
    await this.favoritesListService.create({ user_id: result.document.id }, req, next)

    return result
  }

  async delete(id, req, next) {

    // Deleta a Lista de Favoritos do usuário
    try {
      const favoriteList = await this.favoritesListService.findMany({}, next, { where: { user_id: id } })
      await this.favoritesListService.delete({}, req, next, { where: { id: favoriteList.rows[0].id } })
    } catch (error) {
      return next(new Error('Erro ao deletar Lista de Favoritos'))
    }

    return await super.delete(id, req, next)
  }
}

module.exports = UserService
