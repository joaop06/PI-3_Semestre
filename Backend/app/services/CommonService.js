const User = require('../models/User')

class CommonService {
    constructor(modelName, models, repositoryName) {
        this.modelName = modelName
        this.models = models
    }

    async findAndCountAll(req, options = {
        id: req.query.id ? req.query.id : undefined
    }) {
        console.log(this.modelName)
        console.log(this.models)
        console.log(User)
        let result = {}

        try {
            if (req.query.page && req.query.perPage) {
                const skip = { $skip: (req.query.page - 1) * req.query.perPage }
            } else if (req.query.id == 1) {
                result.rows = [
                    {
                        "name": "<NAME>",
                        "email": '<EMAIL>'
                    }
                ]
            } else {
                return { statusCode: 404, message: 'Nenhum registro encontrado', success: true }
            }
        } catch (error) {
            console.log(error)
            return { statusCode: 500, Error: `${error}`, success: false }
        }

        // const result = await this.modelName.

        return { rows: result.rows, count: result.rows.length, success: true }
    }

    async create(req, res) {

        return
    }

    async update(req, res) {

        return
    }

    async destroy(req, res) {

        return
    }
}

module.exports = CommonService