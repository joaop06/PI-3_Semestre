const CommonService = require('./CommonService')
// const { User: UserModel } = require('../models/User')
const { User: UserModel } = require('../models/User')
const moment = require('moment')

class UserService extends CommonService {
    constructor(modelName, models) {
        super(modelName, models)
        this.modelName = modelName
        this.models = models
    }

    async teste(req) {
        return super.find(req)
    }

    async create(User, req) {
        try {
            const verifyRegister = await super.find(req, { email: User.email })

            if (verifyRegister) {
                return { statusCode: 409, message: "E-mail já cadastro." }
            }

            return await super.create(User)

        } catch (error) {
            console.log(error)
            return { statusCode: 500, message: "Erro ao cadastrar usuário" }
        }
    }

}

module.exports = UserService