<template>
    <div class="body">
        <br>
        <div class="bg-warning mx-10 h-100">
            <br>
            <v-card v-for="(post) in posts" :key="post.id" class="ma-6" variant="outlined">
                <v-card-title class="text-h4">
                    {{ post.title }}
                </v-card-title>
                <template v-slot:prepend>
                    <v-icon size="x-large"></v-icon>
                </template>

                <v-card-text class="text-truncate py-2">
                    {{ post.description }}
                </v-card-text>

                <v-card-actions>
                    <v-btn class="bg-primary" @click="verDetalhes(post.id)">LER MAIS</v-btn>
                    <v-list-item>
                        <template v-slot:append>
                            <div class="justify-self-end">
                                <v-icon class="me-1" icon="mdi-heart"></v-icon>
                                <span class="subheading me-2">{{ post.likes }}</span>
                            </div>
                        </template>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
  
<script>
import bd from '@/tests/banco.json';
import axios from 'axios'
import Quill from 'quill';
import { Delta } from '@vueup/vue-quill';
import gb from '@/controller/globalVariables';

export default {
    data() {
        return {
            posts: [],
            limiteCaracteres: 50
        };
    },
    // async mounted() {
    //     try {
    //         await axios.get('http://localhost:7000/post')
    //     } catch (error) {

    //     }
    // },
    mounted() {
        // Use axios.get para buscar as postagens
        const id = this.$route.params.id;
        axios.get(`http://localhost:7000/post?id=${id}`) //melhorar essa lógica para que busque todos os post
            .then(response => {
                console.log(response);
                this.posts = response.data; // Atualize a matriz de postagens com os dados da resposta
            })
            .catch(error => {
                console.error('Erro ao buscar as postagens:', error);
            });
    },
    computed: {
        //com esta função, posso resumir o texto apresentado no v-card
        textoLimitado() {
            if (this.textocompleto.length > this.limiteCaracteres) {
                return this.textocompleto.slice(0, this.limiteCaracteres) + '...';
            } else {
                return this.textocompleto;
            }
        },
    },
}
</script>
<style>
.body {
    background-color: blue !important;
    width: 100%;
    height: 100%;
}
</style>