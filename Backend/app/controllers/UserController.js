const UserService = require('../services/UserService')
const CommonController = require('./CommonController')

class UserController extends CommonController {
    constructor() {
        super(UserService, 'User')
    }

}


module.exports = UserController