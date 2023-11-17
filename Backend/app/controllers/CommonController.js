
class CommonController {
  constructor(ServiceClass, modelName) {
    this.modelName = modelName
    if (ServiceClass && modelName) {
      this.service = new ServiceClass(modelName)
    }
  }

  // #################################### BUSCAR DOCUMENTOS #################################### \\
  // (Route Default) Busca e Conta todos os documentos
  async findMany(req, res, next) {
    try {
      const result = await this.service.findMany(req, next)
      if (!result) return new Error()

      res.status(200).send({
        ...result,
        message: result?.message ? result.message : result.count > 0 ? `Records Found: ${result.count}` : "No record found",
      })

    } catch (error) {
      return next(error)
    }
  }

  // #################################### INSERIR DOCUMENTOS #################################### \\
  // (Route Default) Insere apenas um único documento por vez
  async create(req, res, next) {
    try {
      const result = await this.service.create(req.body, req, next)
      if (!result) return new Error()

      res.status(201).send("Success when Registering!")

    } catch (error) {
      return next(error)
    }
  }

  // #################################### ATUALIZAR DOCUMENTOS #################################### \\
  // (Route Default) Atualiza um único documento
  async update(req, res, next) {
    try {
      const result = await this.service.update(req.body, req, next)
      if (!result) return new Error()

      res.status(200).send({
        ...result,
        message: result?.message ? result.message : result?.success ? "Success when Editing!" : "Error when editing"
      })

    } catch (error) {
      return next(error)
    }
  }

  // #################################### DELETAR DOCUMENTOS #################################### \\
  // (Route Default) Deleta apenas um documento
  async delete(req, res, next) {
    try {
      const result = await this.service.delete(req.query.id, req, next)
      if (!result) return new Error()

      res.status(200).send({
        result: result,
        message: result?.message ? result?.message : result ? "Success when Deleting!" : "Error when deleting"
      })

    } catch (error) {
      return next(error)
    }
  }
}

module.exports = CommonController
