// const { model } = require('mongoose')
const modelsFn = require('../models')

class CommonController {
    constructor(ServiceClass, modelName) {
        this.models = modelsFn()
        this.modelName = modelName
        if (ServiceClass && modelName) {
            this.service = new ServiceClass(modelName, this.models)
        }
    }

    async findAndCountAll(req, res) {
        const result = await this.service.find(req)

        if (result?.statusCode) {
            res.status(result?.statusCode).json({
                ...result
            })
        } else {
            res.status(200).json({
                ...result,
                message: result?.message ? result.message : result.count > 0 ? `Records Found: ${result?.count}` : 'No record found',
            })
        }
    }

    async create(req, res) {
        const result = await this.service.create(req.body, req)

        if (result?.statusCode) {
            res.status(result?.statusCode).json({
                ...result
            })
        } else {
            res.status(200).json({
                ...result,
                message: result?.message ? result?.message : result?.id ? "Success when Registering!" : "Error when registering"
            })
        }
    }

    async update(req, res) {
        const result = await this.service.update(req.body, req)

        if (result?.statusCode) {
            res.status(result?.statusCode).json({
                ...result
            })
        } else {
            res.status(200).json({
                result: result,
                message: result?.message ? result?.message : result?.id ? "Success when Editing!" : "Error when editing"
            })
        }
    }

    async destroy(req, res) {
        const result = await this.service.destroy(req.query.id, req)

        if (result?.statusCode) {
            res.status(result?.statusCode).json({
                ...result
            })

        } else {
            res.status(200).json({
                result: result,
                message: result?.message ? result?.message : result?.id ? "Success when Deleting!" : "Error when deleting"
            })
        }
    }
}


module.exports = CommonController