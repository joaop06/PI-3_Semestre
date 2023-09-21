<template>
    <div class="body">
        <br>
        <div v-if="posts.length > 0" class="bg-warning mx-10 h-100">
            <br>
            <v-card v-for="(post) in posts" :key="post.id" class="ma-6" variant="outlined">
                <v-card-title class="text-h4">
                    {{ post.title }}
                </v-card-title>
                <template v-slot:prepend>
                    <v-icon size="x-large"></v-icon>
                </template>

                <v-card-text class="text-truncate py-2">
                    {{ post.contentPost }}
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
import bd from '@/tests/banco.json';
import axios from 'axios'
import Quill from 'quill';
import { Delta } from '@vueup/vue-quill';
import gb from '@/controller/globalVariables';

export default {
    data() {
        return {
            titulo: '',
            description: '',
            posts: [],
            contentPost: [],
            limiteCaracteres: 50,
            jstring: [],
            jsonado: [],
            ops: []
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
        axios.get("http://localhost:7000/post")
            .then(response => {
                // console.log(...response.data.rows);
                // for (let post in response) {

                // }
                if (Array.isArray(response.data.rows) && response.data.rows.length > 0) {
                    this.posts = response.data.rows;

                    const stringado = JSON.stringify(this.posts);
                    const jsonado = JSON.parse(stringado);
                    let other = [];
                    let otherstringado = [];
                    let otherjsonado = [];
                    let deltado = [];
                    // console.log(jsonado);
                    for (let i = 0; i < this.posts.length; i++) {
                        //converter todos os textos para texto simples, mas o delta não está
                        // sendo transformado com as informações do json 
                        console.log('teste: ',jsonado[i].contentPost);
                        other[i] = jsonado[i].contentPost;
                        otherstringado[i] = JSON.stringify(other[i]);
                        otherjsonado[i] = JSON.parse(otherstringado[i]);
                        deltado[i] = new Delta(JSON.parse(otherstringado[2]));
                        console.log('other: ', other[i]);
                        console.log('other Stringado: ', otherstringado[i]);
                        console.log('other jsonado: ', otherjsonado[i]);
                        console.log('deltado: ', deltado[i]);

                        // console.log('TENTANDO PARSEAR', JSON.parse(other[1]));
                    }

                    //teste para transformar o json de resposta para delta e depois em texto
                    // const stringado = JSON.stringify(this.posts); transformar todo o json em string  
                    // const jsonado = JSON.parse(stringado); após estar em string, converte para json
                    // const other = new Delta(JSON.parse(jsonespecifico)); do json converte para delta
                    // console.log('texto: ',this.converterTexto(other)); essa funcao pega o delta e transforma em texto
                    // const jsonespecifico = jsonado[4]?.contentPost;
                    // console.log("json especifico", jsonespecifico)
                    // console.log('deltado', other);
                    // console.log('normal: ', this.posts);
                    // console.log('jsonado: ', jsonado);
                    // console.log('tentativa de pegar a informação\n', jsonado[4]?.contentPost)
                } else {
                    console.warn('Nenhuma postagem encontrada na resposta da API.');
                }
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
    methods: {
        converterTexto(delta) {
            let text = '';
            delta.ops.forEach(op => {
                if (op.insert) {
                    text += op.insert;
                }
            });
            return text;
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