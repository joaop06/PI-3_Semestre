const UserService = require("../services/UserService")
const CommonController = require("./CommonController")

class UserController extends CommonController {
  constructor() {
    super(UserService, "User")
  }

  async login(req, res, next) {
    try {
      const result = await this.service.login(req.body, req, next)

      if (!result) return next(new Error())

      res.status(200).send(result)

    } catch (error) {
      console.error(error)
      res.status(500).send('Erro ao realizar o login')
    }
  }
}

module.exports = UserController
