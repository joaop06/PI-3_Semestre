const { resolve } = require("path");
const User = require("../models/User");

class CommonService {
  constructor(modelName, models, repositoryName) {
    this.modelName = modelName;
    this.models = models;
  }

  // Busca apenas um documento pelo ID
  async findById(
    req,
    options = {
      where: req.query?.id
        ? { id: req.query.id }
        : req.body?.id
        ? { id: req.body.id }
        : {},
    }
  ) {
    try {
      return await this.models[this.modelName].findById(options);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Validated
  // (Route Default) Busca e Conta todos os documentos (Route Default)
  async find(req, options) {
    return new Promise(async () => {
      try {
        Object.entries(req.query).map(([key, value]) => {
          options.where = { [key]: value };
        });
        const result = await this.models[this.modelName].find(
          options.where || options
        );
        resolve(result);
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  // Validated
  // (Route Default) Insere apenas um único documento (Route Default)
  async create(object, req) {
    return new Promise(async () => {});
    try {
      const result = await this.models[this.modelName].create(object);
      return { success: true, result: result?._doc };
    } catch (error) {
      throw new Error(error);
    }
  }

  // Insere vários documentos de uma vez
  async insertMany(object, req) {
    try {
      const result = await this.models[this.modelName].insertMany(object);
      return { success: true, result: result?._doc };
    } catch (error) {
      throw new Error(error);
    }
  }

  // (Route Default) Atualiza um único documento (Route Default)
  async update(
    object,
    req,
    options = {
      where: object?.id ? { _id: object.id } : undefined,
    }
  ) {
    try {
      const result = await this.models[this.modelName].updateOne(
        options.where ?? options,
        object
      );
      return { success: true, result: result };
    } catch (error) {
      throw new Error(error);
    }
  }

  // Atualiza vários documentos
  async updateMany(req) {
    try {
      const result = await this.models[this.modelName].updateMany();
      return { success: true, result: result?._doc };
    } catch (error) {
      throw new Error(error);
    }
  }

  // (Route Default) Deleta apenas um documento (Route Default)
  async delete(id) {
    return new Promise(async () => {
      try {
        const result = await this.models[this.modelName].deleteOne(id);
        resolve(result);
      } catch (error) {
        throw new Error(`Erro ao excluir o documento: ${error.message}`);
      }
    });
  }

  // Deleta vários documentos
  // async delete(id, req, options) {
  //   try {
  //     const result = await this.models[this.modelName].deleteMany();
  //     return { success: true, result: result?._doc };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

module.exports = CommonService;
