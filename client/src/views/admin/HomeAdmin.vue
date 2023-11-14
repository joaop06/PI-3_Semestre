<template>
  <Navbar />
  <v-app id="inspire">

    <v-main class="">
      <v-container fluid class="container">
        <v-row class="linha" wrap>
          <v-col cols="6">
            <v-div>
              <v-card class="" max-width="368">
                <v-card-item title="Postagens">
                </v-card-item>

                <v-card-text class="py-0">
                  <v-row align="center" no-gutters>
                    <v-col class="text-h2" cols="6">
                      {{ this.postagens }}
                    </v-col>

                  </v-row>
                </v-card-text>
              </v-card>
            </v-div>
          </v-col>
          <v-col cols="6">
            <v-card class="" max-width="368">
              <v-card-item title="Usuários cadastrados">
              </v-card-item>

              <v-card-text class="py-0">
                <v-row align="center" no-gutters>
                  <v-col class="text-h2" cols="6">
                    {{ this.users }}
                  </v-col>

                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.container {
  background-color: yellow;
  height: 100%;
}

.linha {
  display: flex;
  background-color: pink;
  margin: auto;
  border-radius: 10px;
  justify-content: baseline;
}

.coluna {
  width: 100vw;
  background-color: green;
}

.cards {
  max-width: 100%;
  max-height: 400px;
}

.content {
  font-family: 'Open Sans';
}
</style>

<script>

import Navbar from '@/components/Navbar.vue'
import http from '@/http'

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      textocompleto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur recusandae maxime repellat quas quaerat necessitatibus ea commodi. Minus totam nobis repellendus laboriosam ullam autem debitis, pariatur perspiciatis, atque ipsam quo.', //variavel para pegar o texto futuramente
      limiteCaracteres: 150, //limitador dos caracteres
      posts: [],
      postagens: 0,
      users: 0
    };
  },
  created(){
    this.buscarPosts();
    this.buscarUsers();
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
    async buscarPosts() {
      await http.get("/post")
        .then(response => {

          if (Array.isArray(response.data.rows) && response.data.rows.length > 0) {
            this.posts = response.data.rows;

            console.log('posts aqui: ', this.posts);
            this.postagens = this.posts.length
            console.log(this.postagens)

          } else {
            console.warn('Nenhuma postagem encontrada na resposta da API.');
          }
        })
        .catch(error => {
          console.error('Erro ao buscar as postagens:', error);
        });
    },
    async buscarUsers(){
      await http.get("/user")
      .then(response => {
        this.users = response.data.count;
      });

      }
  }
}
</script>