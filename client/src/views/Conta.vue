<template>
    <v-container class="bg-primary">
        <v-row>
            <v-col cols="12">
                <h1 class="d-flex align-center justify-center">Administração de Conta</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="bg-warning d-flex justify-center" cols="12">
                <v-card class="card">
                    <br>
                    <h2 class="d-flex justify-center">Olá, {{ user.name }}!</h2>
                    <v-divider></v-divider>
                    <p class="d-flex justify-center">Email: {{ user.email }}</p>
                    <v-divider></v-divider><br>
                    <v-btn color="primary" @click="showPasswordDialog = true">Alterar Senha</v-btn>
                </v-card>
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
.card {
    width: 40vw;
    height: 40vh;
}

.botao {
    
}
</style>
  