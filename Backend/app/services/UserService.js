const CommonService = require('./CommonService')

class UserService extends CommonService {
    constructor(repository, models) {
        super(repository, models)
    }

}

module.exports = UserService