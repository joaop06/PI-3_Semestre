const prisma = require('prisma')
const CommonService = require("./CommonService")


class UserService extends CommonService {
  constructor(modelName, models) {
    super(modelName, models)
    this.modelName = modelName
    this.models = models
  }

  async create(User) {
    const verifyRegister = await super.findOne({ email: User.email })

    if (verifyRegister.found)
      return { statusCode: 409, message: "E-mail já cadastro." }

    return await super.create(User)
  }
}

module.exports = UserService
