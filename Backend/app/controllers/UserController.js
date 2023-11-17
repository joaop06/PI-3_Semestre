const UserService = require("../services/UserService")
const CommonController = require("./CommonController")

class UserController extends CommonController {
  constructor() {
    super(UserService, "User")
  }

  async login(req, res, next) {
    try {
      const result = await this.service.login(req.body, req, next)

      if (!result) throw Object.assign(new Error('Erro ao realizar o login'), { statusCode: 400 })

      res.status(200).send({ ...result })

    } catch (e) {
      return next(e)
    }
  }
}

module.exports = UserController
