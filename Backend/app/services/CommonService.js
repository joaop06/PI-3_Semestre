const User = require('../models/User')

class CommonService {
    constructor(modelName, models, repositoryName) {
        this.modelName = modelName
        this.models = models
    }

    async findOne(req, options = {
        where: req.query?.id ? { id: req.query.id } : {}
    }) {
        try {
            return await this.models[this.modelName].findOne(options)
        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro na busca única em ${this.modelName}` }
        }

    }

    async findAndCountAll(req, options = {
        where: req.query?.id ? { id: req.query.id } : {}
    }) {
        try {
            if (req.query) {
                Object.entries(req.query).map(([key, value]) => {
                    options.where[key] = value
                })
            }

            const result = await this.models[this.modelName].find(options.where)
            return { count: result.length, success: true, rows: result }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro na busca em ${this.modelName}` }
        }
    }

    async create(object, req) {
        try {
            const result = await this.models[this.modelName].create(object)
            return { success: true, result: result }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao cadastrar em ${this.modelName}` }
        }
    }

    async update(object, req, options) {

        return
    }

    async destroy(id, req, options) {

        return
    }
}

module.exports = CommonService