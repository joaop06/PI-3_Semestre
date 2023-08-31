const modelsFn = require("../models")

class CommonController {
  constructor(ServiceClass, modelName) {
    this.models = modelsFn()
    this.modelName = modelName
    if (ServiceClass && modelName) {
      this.service = new ServiceClass(modelName, this.models)
    }
  }

  // #################################### BUSCAR DOCUMENTOS #################################### \\

  // (Route Default) Busca e Conta todos os documentos
  async find(req, res) {
    const result = await this.service.find(req)

    if (result?.statusCode) {
      res.status(result?.statusCode).json({
        ...result,
      })

    } else {
      res.status(200).json({
        ...result,
        message: result?.message ? result.message : result.count > 0 ? `Records Found: ${result.count}` : "No record found",
      })
    }
  }

  // Busca apenas um documento pelo ID
  async findById(req, res) {
    const result = await this.service.findById(req.query.id)

    if (result?.statusCode) {
      res.status(result?.statusCode).json({
        ...result,
      })

    } else {
      res.status(200).json({
        ...result,
        message: result?.message ? result.message : result.count > 0 ? `Records Found: ${result?.count}` : "No record found"
      })
    }
  }

  // #################################### INSERIR DOCUMENTOS #################################### \\

  // (Route Default) Insere apenas um único documento por vez
  async create(req, res) {
    const result = await this.service.create(req.body, req)

    if (result?.statusCode) {
      res.status(result?.statusCode).json({
        ...result,
      })

    } else {
      res.status(200).json({
        ...result,
        message: result?.message ? result.message : result.success ? "Success when Registering!" : "Error when registering"
      })
    }
  }

  // Insere vários documentos de uma vez
  async insertMany(req, res) {
    const result = await this.service.insertMany(req.body)

    if (result?.statusCode) {
      res.status(result?.statusCode).json({
        ...result,
      })

    } else {
      res.status(200).json({
        ...result,
        message: result?.message ? result?.message : result?.result ? "Success when Registering!" : "Error when registering"
      })
    }
  }

  // #################################### ATUALIZAR DOCUMENTOS #################################### \\

  // (Route Default) Atualiza um único documento
  async update(req, res) {
    const result = await this.service.update(req, req.body)

    if (result?.statusCode) {
      res.status(result?.statusCode).json({
        ...result,
      })

    } else {
      res.status(200).json({
        ...result,
        message: result?.message ? result.message : result?.acknowledged ? "Success when Editing!" : "Error when editing"
      })
    }
  }

  // #################################### DELETAR DOCUMENTOS #################################### \\

  // (Route Default) Deleta apenas um documento
  async delete(req, res) {
    const result = await this.service.delete(req.query.id)

    if (result?.statusCode) {
      res.status(result?.statusCode).json({
        ...result,
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
