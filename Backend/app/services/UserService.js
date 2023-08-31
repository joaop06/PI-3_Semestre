const prisma = require('prisma')
const CommonService = require("./CommonService")


class UserService extends CommonService {
  constructor(modelName) {
    super(modelName)
    this.modelName = modelName
  }

  async create(User, req) {
    // req.query = { email: User.email }
    // const verifyRegister = await super.find(req)

    // if (verifyRegister.found)
    //   return { statusCode: 409, message: "E-mail já cadastro." }

    return await super.create(User)
  }
}

module.exports = UserService
