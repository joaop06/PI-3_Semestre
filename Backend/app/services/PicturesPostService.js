const CommonService = require('./CommonService')
const moment = require('moment')

class PicturesPostService extends CommonService {
    constructor(modelName) {
        super(modelName)
        this.modelName = modelName
    }

    async create(PicturesPost, req) {



        return await super.create(PicturesPost, req)
    }
}

module.exports = PicturesPostService