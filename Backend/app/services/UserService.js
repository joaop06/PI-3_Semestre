const prisma = require('prisma')
const CommonService = require("./CommonService")


class UserService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }

  async create(User, req) {
    const verifyRegister = await super.find(req, { where: { email: User.email } })

    if (verifyRegister.count > 0)
      return { statusCode: 409, message: "E-mail já cadastro" }

    return await super.create(User)
  }
}

module.exports = UserService
