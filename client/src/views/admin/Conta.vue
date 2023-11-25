<template>
  <Navbar />
  <v-container>
    <v-row>
      <v-col cols="12" class="coluna">
        <h1 class="titulo">Seja bem vindo à sua conta!!</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center" cols="12">
        <v-card class="card">
          <div class="mt-10 d-flex justify-center">
            <v-avatar class="avatar" size="120">
              <v-img :height="100" :src="user.avatar" />
            </v-avatar>
          </div>
          <br />
          <h2 class="text d-flex justify-center">{{ user.name }}</h2>
          <br />
          <p class="text d-flex justify-center">Email: {{ user.email }}</p>
          <br />
          <div class="d-flex justify-center">
            <v-btn
              class="mx-3 button"
              @click="showPasswordDialog = true"
              title="trocar senha"
              icon
            >
              <v-icon>mdi-lock</v-icon>
            </v-btn>
            <v-btn
              class="mx-3 button"
              @click="showDeleteDialog = true"
              title="apagar conta"
              icon
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn class="mx-3 button" @click="likesview" title="curtidas" icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn class="mx-3 button" @click="favsview" title="favoritos" icon>
              <v-icon>mdi-star</v-icon>
            </v-btn>
            <v-btn
              class="mx-3 button"
              @click="logout"
              title="sair da conta"
              icon
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- confirmação para alteração de senha -->
    <v-dialog v-model="showPasswordDialog" max-width="400">
      <v-card>
        <v-card-title>Alterar Senha</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newPassword"
            label="Nova Senha"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmNewPassword"
            label="Confirmar Nova Senha"
            type="password"
            required
          ></v-text-field>
          <v-btn color="primary" @click="changePassword">Salvar Senha</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="showPasswordDialog = false"
            >Cancelar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- confirmação para deleção de usuario -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>Tem certeza que deseja apagar?</v-card-title>
        <v-card-text>
          <label
            >Você perderá todos os seus dados, sem possibilidade de
            reave-los</label
          >
        </v-card-text>
        <v-card-actions class="buttons">
          <v-btn
            id="buttonDialogE"
            color="error"
            @click="showDeleteDialog = false"
            >Cancelar</v-btn
          >
          <v-btn id="buttonDialogD" color="primary" @click="deleteAccount()"
            >Deletar mesmo assim</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Caixa de Diálogo para Resultados -->
    <v-dialog v-model="showDialogResult" max-width="30vw">
      <v-card>
        <v-card-text
          class="text-center text-h6 text-pink-darken-4 font-weight-bold"
        >
          {{ textDialogResult }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
  
<script>
import router from "@/router/index";
import http from "@/http";
import Navbar from "../../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      usuario: {},
      user: {
        name: "",
        email: "",
        avatar: "/src/assets/icon.png",
      },
      showDeleteDialog: false,
      showPasswordDialog: false,
      newPassword: "",
      confirmNewPassword: "",

      // Caixa de Diálogo
      showDialogResult: false,
      textDialogResult: "",
      typeUser: "",
    };
  },
  methods: {
    async changePassword() {
      if (
        this.newPassword === this.confirmNewPassword &&
        this.newPassword.length >= 5
      ) {
        await http
          .put(`/user?id=${this.usuario.id}`, {
            password: this.newPassword,
          })
          .then((res) => {
            // Exibe Caixas de Diálogo com Mensagens de Sucesso
            this.textDialogResult = "Senha Alterada com Sucesso!";
            this.showDialogResult = true;
            this.showPasswordDialog = false;
            setTimeout(() => {
              this.showDialogResult = false;
            }, 1500);
          })
          .catch((err) => {
            console.error(err);
            this.textDialogResult = "Erro ao alterar senha";
            this.showDialogResult = true;
            setTimeout(() => {
              this.showDialogResult = false;
            }, 2000);
          });
      } else {
        this.textDialogResult = "Senhas não coincidem";
        this.showDialogResult = true;
        setTimeout(() => {
          this.showDialogResult = false;
        }, 2000);
      }
    },
    async deleteAccount() {
      await http
        .delete(`/user?id=${this.usuario.id}`)
        .then((res) => {
          this.textDialogResult =
            "Conta deletada com sucesso!\nVocê será redirecionado";
          this.showDialogResult = true;

          // Remove Dados do Session Storage
          sessionStorage.removeItem("userData");
          sessionStorage.setItem("typeUser", "client");
          sessionStorage.removeItem("userId");

          // Redireciona para a Página Inicial
          setTimeout(() => {
            this.showDialogResult = false;
            router.push({ name: "Home" });
          }, 2000);
        })
        .catch((err) => {
          this.textDialogResult = "Erro ao Deletar Conta";
          this.showDialogResult = true;
          setTimeout(() => {
            this.showDialogResult = false;
          }, 2000);
        });
    },
    editProfile() {
      // Lógica para editar o perfil aqui
    },
    logout() {
      // Lógica para fazer logout aqui
      let route = "";

      sessionStorage.removeItem("userData");
      sessionStorage.setItem("typeUser", "client");
      sessionStorage.removeItem("userId");

      route = "Home";

      router.push({ name: `${route}` });
    },
    likesview() {
      router.push({ name: "LikeView" });
    },
    favsview() {
      router.push({ name: "FavsView" });
    },
  },
  mounted() {
    this.usuario = JSON.parse(sessionStorage.getItem("userData"));
    this.user.name = this.usuario.name;
    this.user.email = this.usuario.email;
  },
};
</script>
  
<style scoped>
.coluna {
  background-color: transparent;
  display: flex;
  justify-content: center;
}
.card {
  width: 40vw;
  height: 60vh;
  border: 2px solid black;
}

.titulo {
  font-weight: bold;
  font-family: "Balsamiq Sans", "Comic Sans";
}

.button {
  background-color: #835d3d;
  color: white;
}

.avatar {
  background-color: white !important;
}

.text {
  font-size: 20px;
  font-family: "Balsamiq Sans", sans-serif;
}
</style>