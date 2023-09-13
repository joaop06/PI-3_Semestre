const prisma = require('prisma')
const CommonService = require("./CommonService")

class UserService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }

  async findMany(req) {
    let options

    // Busca Parcial para o campo `name`
    if (Object.keys(req.query).length !== 0 && req.query?.name) {
      options = {
        where: { name: { contains: req.query.name } }
      }
    }

    return super.findMany(req, options)
  }

  async create(User, req) {
    // const verifyRegister = await super.findMany(req, { where: { email: User.email } })

    // if (verifyRegister.count > 0)
    //   return { statusCode: 409, message: "E-mail já cadastro" }

    return await super.create(User)
  }
}

module.exports = UserService
