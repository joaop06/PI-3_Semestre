const UserController = require('../controllers/UserController')
const CommonRoute = require('./CommonRoute')

class UserRoute extends CommonRoute {
    constructor(app) {
        super(UserController, app, 'user')
    }

    setupRoutes() {
        super.setupRoutes()
        this.app.get(`/${this.route}/teste`, this.controller.teste.bind(this.controller))
    }
}


module.exports = (app) => {
    return new UserRoute(app)
}
