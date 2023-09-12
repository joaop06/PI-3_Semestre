<template>
    <v-container class="bg-primary">
        <v-row>
            <v-col cols="12">
                <h1 class="d-flex align-center justify-center">Administração de Conta</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3">
                <v-avatar size="200">
                    <img :src="user.avatar" alt="Imagem do Usuário" />
                </v-avatar>
            </v-col>
            <v-col  class="bg-warning" cols="9">
                <br>
                <h2>{{ user.name }}</h2>
                <p>{{ user.email }}</p>
                <v-btn color="primary" @click="showPasswordDialog = true">Alterar Senha</v-btn>
            </v-col>
        </v-row>

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
    </v-container>
</template>
  
<script>
export default {
    data() {
        return {
            user: {
                name: "Nome do Usuário",
                email: "usuario@example.com",
                avatar: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Manoel_Gomes_em_2022_%28cortado%29.jpg",
            },
            showPasswordDialog: false,
            password: "",
            confirmPassword: "",
        };
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
    },
};
</script>
  
<style scoped>
/* Seu estilo personalizado aqui */
</style>
  