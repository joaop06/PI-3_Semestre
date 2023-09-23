
class CommonRoute {
  constructor(ControllerClass, app, routerName) {
    this.controller = new ControllerClass()
    this.app = app
    this.route = routerName

    this.setupRoutes()
  }

  // Default Routes
  setupRoutes() {
    this.app.get(`/`, this.sayHello.bind())
    this.app.get(`/pi-3`, this.pi_3.bind())
    this.app.get(`/${this.route}`, this.controller.findMany.bind(this.controller))
    this.app.post(`/${this.route}`, this.controller.create.bind(this.controller))
    this.app.put(`/${this.route}`, this.controller.update.bind(this.controller))
    this.app.delete(`/${this.route}`, this.controller.delete.bind(this.controller))
  }

  async sayHello(req, res) {
    res.status(200).send('Hello Word!')
  }

  async pi_3(req, res) {
    res.status(200).send({
      curso: "DSM",
      periodo: "Notrno",
      integrantes: [
        {
          nome: "João Pedro Borges Araújo",
          semestre: "3º"
        },
        {
          nome: "José Gabriel Galvão",
          semestre: "3º"
        },
        {
          nome: "Lauany Barbosa Gonçalves",
          semestre: "3º"
        },
        {
          nome: "Monica Falqueto",
          semestre: "3º"
        }
      ]

    })
  }
}

module.exports = CommonRoute
