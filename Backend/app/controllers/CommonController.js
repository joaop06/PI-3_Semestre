
class CommonController {
  constructor(ServiceClass, modelName) {
    this.modelName = modelName
    if (ServiceClass && modelName) {
      this.service = new ServiceClass(modelName)
    }
  }

  // #################################### BUSCAR DOCUMENTOS #################################### \\
  // (Route Default) Busca e Conta todos os documentos
  async findMany(req, res) {
    try {
      const result = await this.service.findMany(req)
      res.status(200).json({
        ...result,
        message: result?.message ? result.message : result.count > 0 ? `Records Found: ${result.count}` : "No record found",
      })

    } catch (error) {
      res.status(500).json({
        error: error.meta?.cause ? { errorMeta: error.meta.cause } :
          error.name ? { errorName: error.name } : { message: "Internal Error when record found" }
      })
    }
  }

  // #################################### INSERIR DOCUMENTOS #################################### \\
  // (Route Default) Insere apenas um único documento por vez
  async create(req, res) {
    try {
      const result = await this.service.create(req.body, req)
      res.status(200).json({
        ...result,
        message: result?.message ? result.message : result?.success ? "Success when Registering!" : "Error when registering"
      })

    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: error.meta?.cause ? { errorMeta: error.meta.cause } :
          error.name ? { errorName: error.name } : { message: "Internal Error when registering" }
      })
    }
  }

  // #################################### ATUALIZAR DOCUMENTOS #################################### \\
  // (Route Default) Atualiza um único documento
  async update(req, res) {
    try {
      const result = await this.service.update(req.body, req)
      res.status(200).json({
        ...result,
        message: result?.message ? result.message : result?.success ? "Success when Editing!" : "Error when editing"
      })

    } catch (error) {
      res.status(500).json({
        error: error.meta?.cause ? { errorMeta: error.meta.cause } :
          error.name ? { errorName: error.name } : { message: "Internal Error when editing" }
      })
    }
  }

  // #################################### DELETAR DOCUMENTOS #################################### \\
  // (Route Default) Deleta apenas um documento
  async delete(req, res) {
    try {
      const result = await this.service.delete(req.query.id, req)
      res.status(200).json({
        result: result,
        message: result?.message ? result?.message : result ? "Success when Deleting!" : "Error when deleting"
      })

    } catch (error) {
      res.status(500).json({
        error: error.meta?.cause ? { errorMeta: error.meta.cause } :
          error.name ? { errorName: error.name } : { message: "Internal Error when deleting" }
      })
    }
  }
}

module.exports = CommonController
