const NewPostService = require('../services/NewPostService')
const CommonController = require('./CommonController')

class NewPostController extends CommonController {
    constructor() {
        super(NewPostService, 'NewPost')
    }
}

module.exports = NewPostController