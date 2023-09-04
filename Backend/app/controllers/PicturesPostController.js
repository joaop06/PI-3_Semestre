const PicturesPostService = require('../services/PicturesPostService')
const CommonController = require('./CommonController')

class PicturesPostController extends CommonController {
    constructor() {
        super(PicturesPostService, 'PicturesPost')
    }
}

module.exports = PicturesPostController