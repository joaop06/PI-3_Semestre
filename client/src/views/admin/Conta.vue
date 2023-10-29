<template>
    <Navbar />
    <v-container class="">
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
                    <br>
                    <h2 class="text d-flex justify-center">{{ user.name }}</h2>
                    <v-divider></v-divider>
                    <p class="text d-flex justify-center">Email: {{ user.email }}</p>
                    <v-divider></v-divider><br>
                    <div class="d-flex justify-center">
                        <v-btn class="mx-3 button"  @click="showPasswordDialog = true" title="trocar senha" icon>
                            <v-icon>mdi-lock</v-icon>
                        </v-btn>
                        <v-btn class="mx-3 button" @click="showDeleteDialog = true" title="apagar conta" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn class="mx-3 button" @click="editProfile" title="editar" icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn class="mx-3 button" @click="logout" title="sair da conta" icon>
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
                    <v-form @submit="changePassword">
                        <v-text-field v-model="password" label="Nova Senha" type="password" required></v-text-field>
                        <v-text-field v-model="confirmPassword" label="Confirmar Nova Senha" type="password"
                            required></v-text-field>
                        <v-btn color="primary" type="submit">Salvar Senha</v-btn>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="showPasswordDialog = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- confirmação para deleção de usuario -->
        <v-dialog v-model="showDeleteDialog" max-width="400">
            <v-card>
                <v-card-title>Tem certeza que deseja apagar?</v-card-title>
                <v-card-text>
                    <label>Você perderá todos os seus dados, sem possibilidade de reave-los</label>
                </v-card-text>
                <v-card-actions class="buttons">
                    <v-btn id='buttonDialogE' color="error" @click="showDeleteDialog = false">Cancelar</v-btn>
                    <v-btn id='buttonDialogD' color="primary" @click="deleteAccount()">Deletar mesmo assim</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue';
import router from "@/router/index";
import http from '@/http'

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            usuario: '',
            user: {
                name: " ",
                email: " ",
                avatar: "/src/assets/icon.png",
            },
            showDeleteDialog: false,
            showPasswordDialog: false,
            password: "",
            confirmPassword: "",
        };
    },
    created(){
        this.usuario = JSON.parse(sessionStorage.getItem('userData'));
        this.user.name = this.usuario.name;
        this.user.email = this.usuario.email;
    },
    methods: {
        changePassword() {
            // Lógica para alterar a senha aqui
            if (this.password === this.confirmPassword) {
                // Senhas coincidem, faça a alteração aqui
                this.showPasswordDialog = false;
            } else {
                // Senhas não coincidem, trate o erro aqui
            }
        },
        deleteAccount() {
            // Lógica para deletar a conta aqui
            
            // console.log('oi')
            // console.log('userData ', this.usuario.id);

            // http.delete(`user?id=${this.usuario.id}`)

        },
        editProfile() {
            // Lógica para editar o perfil aqui
        },
        logout() {
            // Lógica para fazer logout aqui
            let route = '';

            sessionStorage.removeItem('userData');
            sessionStorage.setItem('typeUser', 'client');
            sessionStorage.removeItem('userId');

            route = 'Home'

            router.push({ name: `${route}` });
        },
    },
};
</script>
  
<style scoped>

.coluna{
    background-color: transparent;
    display: flex;
    justify-content: center;
}
.card {
    width: 40vw;
    height: 60vh;
}

.titulo{
    font-weight: bold;
    font-family: 'Balsamiq Sans', 'Comic Sans';
}

.button{
    background-color: #835D3D;
    color: white;
}

.avatar{
    background-color: white !important;
}

.text{
    font-size: 20px;
    font-family: 'Balsamiq Sans', sans-serif;
}
</style>