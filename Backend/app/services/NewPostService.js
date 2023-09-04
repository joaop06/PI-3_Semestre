const CommonService = require('./CommonService')
const moment = require('moment')

class NewPostService extends CommonService {
    constructor(modelName) {
        super(modelName)
        this.modelName = modelName

        // const picturesPostService = new PicturesPost('PicturesPost')
        // this.picturesPostService = picturesPostService
    }

    async create(NewPost, req) {

        // Define data de criação e atualização padrão
        NewPost.createAt = moment()
        NewPost.updateAt = moment()

        const result = super.create(NewPost, req)


        // const objPicture = {
        //     idPost: 4,
        //     name: 4,
        //     src: req.file.path,
        //     extension: 3
        // }

        // // Salva imagem na pasta e cria registo no banco
        // await this.picturesPostService.create(objPicture, req)



        return result
    }

    async update(NewPost, req) {

        // Atualização de Curtidas no Post
        if ([true, false].includes(NewPost.likes)) {
            let quantityLikes = await this.findMany(req, { where: { id: req.query.id } })
            quantityLikes = quantityLikes.rows[0].likes

            if (NewPost.likes) NewPost.likes = quantityLikes + 1
            else NewPost.likes = quantityLikes - 1
        }

        return super.update(NewPost, req)
    }
}

module.exports = NewPostService