<template>
  <Navbar />
  <v-container class="mt-2 container">
    <v-row no-gutters>
      <v-col v-for="(post, index) in posts" :key="post.id">
        <v-card class="cards pa-2 ma-2" variant="tonal">
          <v-card-title class="title">{{ post.title }}</v-card-title>
          <v-card-text class="text-truncate">{{ conteudoPost[index] }}</v-card-text>
          <v-card-actions>
            <v-btn class="buttonB" @click="verDetalhes(post.id)">Continuar lendo</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- Restante do código CSS e JavaScript permanecem inalterados -->

<style>
.cards {
  background-color: #f7cfcdb6;
  border: 3px solid white
}

#buttonP {
  margin-top: 100%;
}

.buttonB {
  border: 1px solid white;
  background-color: #835D3D;
  color: white;
  font-family: 'Balsamiq Sans', sans-serif;
  font-weight: bold;
}
</style>

<script>
import router from '@/router';
import Navbar from '@/components/Navbar.vue'
import http from '@/http'
import { Delta } from '@vueup/vue-quill';

export default {
  components: {
    Navbar,
  },

  data() {
    return {
      posts: [],
      conteudoPost: [],
    }
  },
  created() {
    this.buscarPosts();
  },
  methods: {
    async buscarPosts() {
      await http.get("/post")
        .then(response => {

          if (Array.isArray(response.data.rows) && response.data.rows.length > 0) {
            this.posts = response.data.rows;

            const stringado = JSON.stringify(this.posts);
            const jsonado = JSON.parse(JSON.stringify(this.posts));

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
      sessionStorage.setItem('idPost', idPost);

      router.push({ path: '/post' })
    },
  }
}
</script>