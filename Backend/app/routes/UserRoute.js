const UserController = require('../controllers/UserController')
const CommonRoute = require('./CommonRoute')

class UserRoute extends CommonRoute {
    constructor(app) {
        super(UserController, app, 'user')
    }

}


module.exports = (app) => {
    return new UserRoute(app)
}
