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
                  v-model="email"
                  color="pink-darken-4"
                  placeholder="Ex: maria_silva@gmail.com"
                  label="E-mail"
                  :style="{ color: 'rgb(245, 0, 87)' }"
                  :rules="[required, validEmail]"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="password"
                  color="pink-darken-4"
                  placeholder="Ex: maria123"
                  label="Senha"
                  :style="{ color: 'rgb(245, 0, 87)' }"
                  :append-inner-icon="
                    showPasswordLogin ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="showPasswordLogin = !showPasswordLogin"
                  :type="showPasswordLogin ? 'text' : 'password'"
                  :rules="[required]"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-btn
                  @click="login"
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
                  v-model="name"
                  color="pink-darken-4"
                  placeholder="Maria Silva"
                  label="Nome"
                  :style="{ color: 'rgb(245, 0, 87)' }"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="emailRegister"
                    color="pink-darken-4"
                    placeholder="Ex: maria_silva@gmail.com"
                    label="E-mail"
                    :style="{ color: 'rgb(245, 0, 87)' }"
                    :rules="[required, validEmail]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="ma-auto justify-center">
                <v-col cols="6">
                  <v-text-field
                    v-model="passwordRegister"
                    color="pink-darken-4"
                    placeholder="Ex: maria123"
                    label="Senha"
                    :style="{ color: 'rgb(245, 0, 87)' }"
                    :append-inner-icon="
                      showPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append-inner="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="confirmePassword"
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
                  @click="register"
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

    <v-dialog v-model="showDialog" max-width="30vw">
      <v-card>
        <v-card-text
          class="text-center text-h6 text-pink-darken-4 font-weight-bold"
        >
          {{ textDialog }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import http from "@/http";
import router from "@/router/index";
import gb from "@/controller/globalVariables";

export default {
  data() {
    return {
      // Login
      email: "",
      password: "",
      showPasswordLogin: false,

      // Cadastro
      name: "",
      emailRegister: "",
      passwordRegister: "",
      confirmePassword: "",
      showPassword: false,
      showConfirmedPassword: false,

      // Caixa de Diálogo
      showDialog: false,
      textDialog: "",
    };
  },
  methods: {
    // Verifica Senha válida
    required(value) {
      if (value !== undefined && value.length < 5 && value.length > 0)
        return "Mínimo 5 caracteres";

      return !!value || "Este campo é obrigatório";
    },

    // Verifica E-mail válido
    validEmail(value) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) || "Endereço de e-mail inválido";
    },

    // Função de Login
    async login() {
      // Verifica valores dos campos
      const verifyEmail = this.required(this.email) == true ? true : false;
      const verifyPass = this.required(this.password) == true ? true : false;
      if (!verifyEmail || !verifyPass) {
        this.showDialog = true;
        this.textDialog = "Campos de Login não preenchidos corretamente!";
        setTimeout(() => {
          this.showDialog = false;
        }, 2500);
        return;
      }

      try {
        const resultLogin = await http.post("/user/login", {
          email: this.email,
          password: this.password,
        });

        // Dados do Usuário na variável global
        gb.userData = resultLogin.data.userLogin;
        gb.userId = resultLogin.data.userLogin.id;
        console.log(gb);

        // Exibe caixa de diálogo
        this.showDialog = true;
        this.textDialog = "Login realizado!";

        // Redireciona para Home
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 2000);

        return;
      } catch (error) {
        console.error(error);

        // Mensagem que será exibida
        this.showDialog = true;
        if (error.response.status === 401) {
          this.textDialog = error.response.data.error;
        } else {
          this.textDialog = "Erro ao realizar login";
        }

        // Desativa Caixa de Diálogo
        setTimeout(() => {
          this.showDialog = false;
        }, 3000);
        return;
      }
    },

    // Função de Cadastro
    async register() {
      // Verifica valores dos campos
      const verifyName = this.name ? true : false;
      const verifyEmail =
        this.required(this.emailRegister) == true ? true : false;
      const verifyPass =
        this.required(this.passwordRegister) == true ? true : false;
      if (!verifyName || !verifyEmail || !verifyPass) {
        this.showDialog = true;
        this.textDialog = "Campos de Cadastro não preenchidos corretamente!";

        // Desativa Caixa de Diálogo depois de 2 segundos
        setTimeout(() => {
          this.showDialog = false;
        }, 2500);
        return;
      }

      // Valida Confirmação de Senha
      if (this.passwordRegister != this.confirmePassword) {
        this.showDialog = true;
        this.textDialog = "As senhas não conferem!";
        setTimeout(() => {
          this.showDialog = false;
        }, 2500);
        return;
      }

      // Requisição de cadastro de Usuário
      try {
        const resultRegister = await http.post("/user", {
          name: this.name,
          email: this.emailRegister,
          password: this.passwordRegister,
          isAdmin: false,
        });

        if (resultRegister.status == 201) {
          // Exibe Caixa de Diálogo
          this.showDialog = true;
          this.textDialog = "Cadastro realizado com sucesso!";

          // Desativa Caixa de Diálogo
          setTimeout(() => {
            this.showDialog = false;

            // Preenche o campo de E-mail para Login
            this.email = this.emailRegister;

            // Limpa os campos de cadastro
            this.name = "";
            this.emailRegister = "";
            this.passwordRegister = "";
            this.confirmePassword = "";
          }, 2500);
        }
      } catch (error) {
        console.error(error);
        this.showDialog = true;

        // Mensagem que será exibida na Caixa de Diálogo
        this.textDialog = error.response.data.error;

        // Desativa Caixa de Diálogo
        setTimeout(() => {
          this.showDialog = false;
        }, 2500);
      }
    },
  },
};
</script>


<style>
.v-main {
  background-color: rgb(248, 196, 194);
  background-image: url("../../../public/logo-LilicaIndica-removebg.png");
  background-position: 50% 50%;
}

#effectGlass {
  backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 20px;
}
</style>