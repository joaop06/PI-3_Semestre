// const { model } = require('mongoose')
const modelsFn = require('../models')

class CommonController {
    constructor(ServiceClass, modelName, optFn = () => { }) {
        this.models = modelsFn()
        this.modelName = modelName
        if (ServiceClass && modelName) {
            this.service = new ServiceClass(modelName, this.models, optFn(this.models))
        }
    }

    async findAndCountAll(req, res) {
        const result = await this.service.findAndCountAll(req)

        if (result?.statusCode) {
            res.status(result?.statusCode).json({
                ...result,
                message: result?.message ? result.message : undefined,
                success: result?.success
            })
        } else {
            res.status(200).json({
                rows: result?.rows,
                count: result?.count,
                message: result?.message ? result.message : result.count > 0 ? `Records Found: ${result?.count}` : 'No record found',
                success: result?.success
            })
        }
    }

    async create(req, res) {
        const result = await this.service.create(req.body, req)

        if (result?.statusCode) {
            res.status(result.statusCode).json({
                ...result,
                message: result?.message ? result?.message : undefined
            })
        } else {
            res.status(200).json({
                rows: result?.rows,
                count: result?.count,
                message: result?.message ? result?.message : result?.success ? "Success when Registering!" : "Error when registering"
            })
        }
    }

    async update(req, res) {

        res.status(200).json({ message: "TESTE PUT" })
    }

    async destroy(req, res) {

        res.status(200).json({ message: "TESTE DELETE" })
    }
}


module.exports = CommonController