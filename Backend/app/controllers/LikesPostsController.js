const LikesPostsService = require('../services/LikesPostsService')
const CommonController = require('./CommonController')

class LikesPostsController extends CommonController {
    constructor() {
        super(LikesPostsService, 'LikesPosts')
    }
}

module.exports = LikesPostsController