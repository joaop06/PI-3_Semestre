const prisma = require('../db/prisma')
const CommonService = require("./CommonService")


class UserService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }

  async create(User) {
    const verifyRegister = await super.findOne({ email: User.email })

    if (verifyRegister.found)
      return { statusCode: 409, message: "E-mail já cadastro." }

    return await super.create(User)
  }
}

module.exports = UserService
