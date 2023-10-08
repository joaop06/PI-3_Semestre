<template>
  <v-container class="pa-12 ma-12">
    <v-sheet id="effectGlass" color="rgb(0, 0, 0, 0)">
      <v-row
        class="ma-auto d-flex"
        justify="center"
        color="rgb(248, 187, 208, 0.7)"
      >
        <!-- ************************ LOGIN ************************ -->
        <v-col cols="4" class="ma-auto">
          <v-sheet
            id="login"
            class="ma-auto pa-5"
            color="rgb(248, 187, 208, 0.85)"
            rounded="lg"
            :elevation="4"
          >
            <v-list-item-title class="pt-12 mb-n10 text-center">
              <span
                class="text-h4 text-brown-lighten-1 font-weight-bold"
                color="rgb(183, 28, 28)"
              >
                LOGIN
              </span>
            </v-list-item-title>

            <v-card
              class="ma-5 pa-5 justify-center align-center"
              color="rgb(0,0,0,0)"
              :elevation="0"
              height="50vh"
              align="center"
              justify="center"
            >
              <v-row class="mt-12">
                <v-text-field
                  color="pink-darken-4"
                  placeholder="Ex: maria_silva@gmail.com"
                  label="E-mail"
                  :style="{ color: 'rgb(245, 0, 87)' }"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  color="pink-darken-4"
                  placeholder="Ex: maria123"
                  label="Senha"
                  :style="{ color: 'rgb(245, 0, 87)' }"
                  :append-inner-icon="
                    showPasswordLogin ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="showPasswordLogin = !showPasswordLogin"
                  :type="showPasswordLogin ? 'text' : 'password'"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-btn
                  class="ma-auto text-brown"
                  width="12vw"
                  color="yellow-lighten-2"
                  >LOGIN</v-btn
                >
              </v-row>
            </v-card>
          </v-sheet>
        </v-col>

        <!-- ************************ CADASTRO ************************ -->
        <v-col cols="5" class="ma-auto">
          <v-sheet
            id="cadastro"
            class="ma-auto pa-5"
            color="rgb(248, 187, 208, 0.85)"
            rounded="lg"
            :elevation="4"
          >
            <v-list-item-title class="pt-12 mb-n10 text-center">
              <span
                class="text-h4 text-brown-lighten-1 font-weight-bold"
                color="rgb(183, 28, 28)"
              >
                CADASTRO
              </span>
            </v-list-item-title>

            <v-card
              class="ma-5 pa-5 justify-center align-center"
              color="rgb(0,0,0,0)"
              :elevation="0"
              height="50vh"
              align="center"
              justify="center"
            >
              <v-row class="mt-12">
                <v-text-field
                  color="pink-darken-4"
                  placeholder="Maria Silva"
                  label="Nome"
                  :style="{ color: 'rgb(245, 0, 87)' }"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    color="pink-darken-4"
                    placeholder="Ex: maria_silva@gmail.com"
                    label="E-mail"
                    :style="{ color: 'rgb(245, 0, 87)' }"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="ma-auto justify-center">
                <v-col cols="6">
                  <v-text-field
                    color="pink-darken-4"
                    placeholder="Ex: maria123"
                    label="Senha"
                    :style="{ color: 'rgb(245, 0, 87)' }"
                    :append-inner-icon="
                      showPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append-inner="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    color="pink-darken-4"
                    placeholder="Ex: maria123"
                    label="Confirme sua Senha"
                    :style="{ color: 'rgb(245, 0, 87)' }"
                    :append-inner-icon="
                      showConfirmedPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append-inner="
                      showConfirmedPassword = !showConfirmedPassword
                    "
                    :type="showConfirmedPassword ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-btn
                  class="ma-auto text-brown"
                  width="12vw"
                  color="yellow-lighten-2"
                  >CADASTRAR</v-btn
                >
              </v-row>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>

  <!-- <div>
        <v-card class="bg-blue mt-5 mx-auto px-6 py-8" max-width="344" v-if="!temlogin" variant="outlined">
            <v-form v-model="form" @submit.prevent="onlogin">
                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="E-mail"></v-text-field>

                <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Senha"
                    placeholder="Digite sua senha"></v-text-field>

                <br>

                <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                    Login
                </v-btn>
                <br>
                <v-btn @click="cad()" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
                    Cadastro
                </v-btn>
            </v-form>

            <v-dialog v-model="showAlertLogin" persistent max-width="300">
                <v-card>
                    <v-card-text>
                        Logo ô arrombado!
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="success" text @click="roteamento()">OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>


        <v-card class="bg-blue mt-5 mx-auto px-6 py-8" max-width="344" v-else variant="outlined">
            <v-form v-model="form" @submit.prevent="oncadastro">

                <v-text-field v-model="nome" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Nome"></v-text-field>

                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable label="E-mail"
                    type="email"></v-text-field>

                <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Senha"
                    placeholder="Digite sua senha" type="password"></v-text-field>

                <br>

                <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                    Cadastrar Joso
                </v-btn>
                <br>
                <v-btn @click="login()" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
                    Login
                </v-btn>
            </v-form>
        </v-card>

        <v-dialog v-model="showAlert" persistent max-width="300">
            <v-card>
                <v-card-text>
                    Cadastrado com sucesso, faça o login
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" text @click="showAlert = false; temlogin = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div> -->
</template>

<script>
export default {
  data() {
    return {
      // Login
      email: "",
      password: "",
      showPasswordLogin: false,

      // Register
      name: "",
      email: "",
      passwordRegister: "",
      confirmePassword: "",
      showPassword: false,
      showConfirmedPassword: false,
    };
  },
};

// import http from "@/http";
// import router from "@/router/index";
// import gb from "@/controller/globalVariables";

// export default {
//   data: () => ({
//     form: false,
//     email: null,
//     password: null,
//     loading: false,
//     temlogin: false,
//     showAlert: false,
//     showAlertLogin: false,
//     selecionado: false,
//     showMenu: false,
//   }),

//   computed: {
//     showMenu() {
//       return this.temlogin;
//     },
//   },

//   methods: {
//     //REDIRECIONAMENTO APÓS LOGIN BEM SUCEDIDO
//     roteamento() {
//       this.showAlertLogin = false;
//     },
//     //LOGIN
//     //////////////////////////
//     // onlogin() {

//     //     this.loading = true;

//     //     setTimeout(() => (this.loading = false), 5000);
//     //     console.log(this.email, this.password);

//     //     let data = {
//     //         email: this.email,
//     //         password: this.password
//     //     }
//     //     console.log(data);
//     //     http.post('/verificalogin', data)
//     //         .then(response => {
//     //             gb.token = response.data.token;
//     //             gb.usuarioLogado = true;

//     //             console.log('token na variavel global: ', gb.token);

//     //             this.showAlertLogin = true;
//     //             setTimeout(() => {
//     //                 router.push({ name: 'Dashboard' })
//     //             }, 5000);

//     //         })
//     //         .catch(error => {
//     //             console.error(error);

//     //             this.loading = false;
//     //         });
//     // },
//     //CADASTRO
//     /////////////////////
//     oncadastro() {
//       this.loading = true;

//       // Objeto contendo os dados do cadastro
//       const data = {
//         name: this.nome,
//         email: this.email,
//         password: this.password,
//       };

//       // Executar o post diretamente para 'Cliente'

//       http
//         .post("/user", data)
//         .then((response) => {
//           this.showAlert = true;

//           // Limpar os campos do formulário
//           this.nome = null;
//           this.email = null;
//           this.password = null;

//           console.log("resposta: ", response);
//         })
//         .catch((error) => {
//           console.error(error);

//           this.loading = false;
//         });
//     },
//     //REQUIREMENTO DOS CAMPOS
//     required(v) {
//       return !!v || "Campo é obrigatório";
//     },
//     //REDIRECIONAMENTO PARA AS PÁGINAS
//     //CADASTRO
//     cad() {
//       this.temlogin = true;
//     },
//     //LOGIN
//     login() {
//       this.temlogin = false;
//     },
//   },
// };
</script>


<style>
.v-main {
  background-color: rgb(248, 196, 194);
  background-image: url("../../../public/logo-LilicaIndica-removebg.png");
  background-position: 50% 50%;
}

#effectGlass {
  backdrop-filter: blur(3px);
  border-radius: 10px;
  padding: 20px;
}
</style>