const UserService = require('../services/UserService')
const CommonController = require('./CommonController')

class UserController extends CommonController {
    constructor() {
        super(UserService, 'User')
    }

    async teste(req, res) {
        const result = await this.service.teste(req)

        if (result?.statusCode) {
            res.status(result?.statusCode).json({
                ...result
            })
        } else {
            res.status(200).json({
                ...result,
                message: result?.message ? result.message : result?.count > 0 ? `Records Found: ${result.count}` : 'No record found',
            })
        }
    }
}


module.exports = UserController