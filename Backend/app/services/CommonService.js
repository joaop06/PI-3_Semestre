const User = require('../models/User')

class CommonService {
    constructor(modelName, models, repositoryName) {
        this.modelName = modelName
        this.models = models
    }

    // Busca apenas um documento pelo ID
    async findById(req, options = {
        where: req.query?.id ? { id: req.query.id } : req.body?.id ? { id: req.body.id } : {}
    }) {
        try {
            return await this.models[this.modelName].findById(options)

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao buscar em ${this.modelName}` }
        }
    }

    // Validated
    // (Route Default) Busca e Conta todos os documentos (Route Default)
    async find(req, options = {
        where: req.query?.id ? { id: req.query.id } : {}
    }) {
        try {
            let result
            if (req.query?.id) {
                result = await this.models[this.modelName].find(options)

            } else if (![null, undefined, {}].includes(req.query)) {
                Object.entries(req.query).map(([key, value]) => {
                    options.where = { [key]: value }
                })
                result = await this.models[this.modelName].find(options.where || options)
            }

            return { count: result.length, success: true, rows: result }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao buscar e contar em ${this.modelName}Collection` }
        }
    }

    // Validated
    // (Route Default) Insere apenas um único documento (Route Default)
    async create(object, req) {
        try {
            const result = await this.models[this.modelName].create(object)
            return { success: true, result: result?._doc }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao cadastrar em ${this.modelName}Collection` }
        }
    }

    // Insere vários documentos de uma vez
    async insertMany(object, req) {
        try {
            const result = await this.models[this.modelName].insertMany(object)
            return { success: true, result: result?._doc }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao cadastrar vários documentos em ${this.modelName}Collection` }
        }
    }

    // (Route Default) Atualiza um único documento (Route Default)
    async update(object, req, options = {
        where: object?.id ? { _id: object.id } : undefined
    }) {
        try {
            const result = await this.models[this.modelName].updateOne(options.where || options, object)
            return { success: true, result: result }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao atualizar em ${this.modelName}Collection` }
        }
    }

    // Atualiza vários documentos
    async updateMany(req) {
        try {
            const result = await this.models[this.modelName].updateMany()
            return { success: true, result: result?._doc }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao atualizar vários documentos em ${this.modelName}Collection` }
        }
    }

    // (Route Default) Deleta apenas um documento (Route Default)
    async destroy(id, req, options) {
        try {
            const result = await this.models[this.modelName].deleteOne()
            return { success: true, result: result?._doc }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao deletar em ${this.modelName}Collection` }
        }
    }

    // Deleta vários documentos
    async deleteMany(id, req, options) {
        try {
            const result = await this.models[this.modelName].deleteMany()
            return { success: true, result: result?._doc }

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: `Erro ao deletar vários documentos em ${this.modelName}Collection` }
        }
    }
}

module.exports = CommonService