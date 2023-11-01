<template>
    <Navbar />
    <div class="body">
        <br>
        <div v-if="posts.length > 0" class="mx-10 h-100">
            <br>
            <v-card v-for="(post, index) in posts" :key="post.id" class="post ma-6" variant="outlined">
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
                    <v-btn class="button" @click="verDetalhes(post.id)">LER MAIS</v-btn>
                    <v-list-item>
                        <template v-slot:append>
                            <div class="justify-self-end">
                                <v-btn icon="mdi-heart" @click="liked(post.id)" variant="plain" alt="like"></v-btn>
                                <v-btn icon="mdi-star" @click="Fav(post.id)" variant="plain" alt="favorite"></v-btn>
                                <span class="subheading me-2">{{ post.likes }}</span>
                            </div>
                        </template>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </div>
        <div v-else class="post mx-10 h-100">
            <p>Carregando postagens...</p>
        </div>
    </div>
</template>
  
<script>
import http from '@/http';
import axios from 'axios'
import Quill from 'quill';
import { Delta } from '@vueup/vue-quill';
import gb from '@/controller/globalVariables';
import router from '@/router';
import Navbar from '@/components/Navbar.vue'

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            titulo: '',
            description: '',
            posts: [],
            userId: '',
            conteudoPost: [],
            liked: false,
            limiteCaracteres: 50,
        };
    },
    mounted() {
        this.userId = sessionStorage.getItem('userId');
        console.log(this.userId)
        //tentar fazer um filtro pelo id também
        http.get("/post")
            .then(response => {

                if (Array.isArray(response.data.rows) && response.data.rows.length > 0) {
                    this.posts = response.data.rows;

                    console.log('posts aqui: ', this.posts);

                    const stringado = JSON.stringify(this.posts);
                    const jsonado = JSON.parse(stringado);

                    for (let i = 0; i < this.posts.length; i++) {

                        const jsonespecifico = jsonado[i]?.contentPost;
                        const other = new Delta(JSON.parse(jsonespecifico));

                        this.conteudo(this.converterTexto(other));

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
        //necessito fazer uma verificação para saber quando um post já foi curtido ou não, para poder dar deslike e desfav
    },
    methods: {
        converterTexto(delta) {
            let text = '';
            delta.ops.forEach(op => {
                if (op.insert && !op.insert.image) {
                    text += op.insert;
                }
            });
            return text;
        },
        conteudo(texto) {
            this.conteudoPost.push(texto);
        },
        verDetalhes(idPost) {
            console.log('id aqui: ', idPost);
            sessionStorage.setItem('idPost', idPost);
            console.log('id aqui na session: ', sessionStorage.getItem('idPost'));

            router.push({ path: '/post' })
        },
        async liked(idPost) {
            // Pega o valor da sessionStorage
            const userId = sessionStorage.getItem('userId');

            // Faz a requisição HTTP
            const response = await http.put(`/post?id=${idPost}&liked=true`, {
                usersLikeID: [userId],
            });

            // Verifica se a requisição foi bem sucedida
            if (response.status === 200) {
                // Obtem os dados da resposta
                const data = response.data;

                // Faz alguma coisa com os dados da resposta
                // ...
            } else {
                // A requisição falhou
                console.error('Erro ao mandar like:', response.statusText);
            }
        },
        async Fav(idPost) {
            // método para mandar as informações do usuario e adicionar aos favs
            // Pega o valor da sessionStorage
            const userId = sessionStorage.getItem('userId');

            // Faz a requisição HTTP
            const response = await http.put(`/post?id=${idPost}&favorite=true`, {
                favoritesListId: [userId],
            });

            // Verifica se a requisição foi bem sucedida
            if (response.status === 200) {
                // Obtem os dados da resposta
                const data = response.data;

                // Faz alguma coisa com os dados da resposta
                // ...
            } else {
                // A requisição falhou
                console.error('Erro ao mandar favorito:', response.statusText);
            }
        }
    }
}
</script>
<style>
.body {
    background-color: #ffff;
    width: 100%;
    height: 100%;
}

.button {
    background-color: #835D3D;
    color: #ffff
}

.post {
    background-color: #f7cfcdb6 !important;
}
</style>