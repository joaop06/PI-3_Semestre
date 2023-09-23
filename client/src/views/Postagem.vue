<template>
    <div class="body">
        <br>
        <div v-if="posts.length > 0" class="bg-warning mx-10 h-100">
            <br>
            <v-card v-for="(post, index) in posts" :key="post.id" class="ma-6" variant="outlined">
                <v-card-title class="text-h4">
                    {{ post.title }}
                </v-card-title>
                <template v-slot:prepend>
                    <v-icon size="x-large"></v-icon>
                </template>

                <v-card-text class="text-truncate py-2">
                    {{ conteudoPost[index] }}
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
        <div v-else class="bg-warning mx-10 h-100">
            <p>Carregando postagens...</p>
        </div>
    </div>
</template>
  
<script>
import http from '@/http';
import axios from 'axios'
import Quill from 'quill';
import { Delta } from '@vueup/vue-quill';
import sergio from '@/controller/globalVariables';
import router from '@/router';

export default {
    data() {
        return {
            titulo: '',
            description: '',
            posts: [],
            conteudoPost: [],
            limiteCaracteres: 50,
        };
    },
    mounted() {
        // Use axios.get para buscar as postagens
        http.get("/post")
            .then(response => {

                if (Array.isArray(response.data.rows) && response.data.rows.length > 0) {
                    this.posts = response.data.rows;

                    console.log(this.posts);

                    const stringado = JSON.stringify(this.posts);
                    const jsonado = JSON.parse(stringado);

                    for (let i = 0; i < this.posts.length; i++) {

                        const jsonespecifico = jsonado[i]?.contentPost;
                        const other = new Delta(JSON.parse(jsonespecifico));

                        this.conteudo(this.converterTexto(other))

                    }

                } else {
                    console.warn('Nenhuma postagem encontrada na resposta da API.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar as postagens:', error);
            });
    },
    computed: {
        textoLimitado() {
            if (this.textocompleto.length > this.limiteCaracteres) {
                return this.textocompleto.slice(0, this.limiteCaracteres) + '...';
            } else {
                return this.textocompleto;
            }
        },
    },
    methods: {
        converterTexto(delta) {
            let text = '';
            delta.ops.forEach(op => {
                if (op.insert) {
                    text += op.insert;
                }
            });
            return text;
        },

        conteudo(texto) {
            this.conteudoPost.push(texto);
        },
        verDetalhes(idPost){
            console.log('id aqui: ',idPost);
            sergio = idPost;
            console.log('id aqui na global: ',sergio);

            router.push({path: '/post'})
        }
    }
}
</script>
<style>
.body {
    background-color: blue !important;
    width: 100%;
    height: 100%;
}
</style>