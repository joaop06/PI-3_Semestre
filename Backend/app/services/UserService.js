const prisma = require('prisma')
const CommonService = require("./CommonService")

class UserService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
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

  async create(User, req) {
    const verifyRegister = await super.findMany(req, { where: { email: User.email } })

    // Retorno caso e-mail informado já esteja cadastrado
    if (verifyRegister.count > 0) return { statusCode: 409, message: "E-mail já cadastro" }

    return await super.create(User)
  }
}

module.exports = UserService
