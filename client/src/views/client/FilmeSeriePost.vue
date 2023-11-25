<template>
  <Navbar />
  <div class="body">
    <br />
    <div v-if="posts.length > 0" class="mx-10 h-100">
      <br />
      <v-card
        v-for="(post, index) in posts"
        :key="post.id"
        class="post ma-6"
        variant="outlined"
      >
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
                <v-btn @click="toggleLikeDislike(post.id, post.liked)">
                  <v-icon>{{
                    post.liked ? "mdi-heart-off" : "mdi-heart"
                  }}</v-icon>
                </v-btn>
                <v-btn
                  @click="toggleFavoriteUnFavorite(post.id, post.favorited)"
                >
                  <v-icon>{{
                    post.favorited ? "mdi-star-off" : "mdi-star"
                  }}</v-icon>
                </v-btn>
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
import http from "@/http";
import axios from "axios";
import Quill from "quill";
import { Delta } from "@vueup/vue-quill";
import gb from "@/controller/globalVariables";
import router from "@/router";
import Navbar from "@/components/Navbar.vue";

const userData = JSON.parse(sessionStorage.getItem("userData"));

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      titulo: "",
      description: "",
      posts: [],
      userId: "",
      conteudoPost: [],
      liked: [],
      likedIcon: false,
      limiteCaracteres: 50,

      favoritesListId: "",
    };
  },
  async created() {
    this.userId = sessionStorage.getItem("userId");
    this.favoritesListId = await http
      .get(`/favorites-list?userId=${this.userId}`)
      .then((res) => res.data.rows[0].id);
    this.buscarPosts();
  },
  async mounted() {},
  computed: {
    //necessito fazer uma verificação para saber quando um post já foi curtido ou não, para poder dar deslike e desfav
  },
  methods: {
    toggleLikeDislike(postId, like) {
      if (like) {
        console.log("dar deslike");
        this.deslike(postId);
      } else {
        console.log("dar like");
        this.likeds(postId);
      }
    },
    toggleFavoriteUnFavorite(postId, favorite) {
      if (favorite) {
        this.Unfav(postId);
      } else {
        this.Fav(postId);
      }
    },
    async buscarPosts() {
      await http
        .get("/post?typePost=audiovisuais")
        .then((response) => {
          if (
            Array.isArray(response.data.rows) &&
            response.data.rows.length > 0
          ) {
            this.posts = response.data.rows;

            const stringado = JSON.stringify(this.posts);
            const jsonado = JSON.parse(stringado);

            for (let i = 0; i < this.posts.length; i++) {
              const jsonespecifico = jsonado[i]?.contentPost;
              const other = new Delta(JSON.parse(jsonespecifico));

              this.conteudo(this.converterTexto(other));

              this.posts[i].liked = !!this.posts[i].usersLikeID.find(
                (likeUser) => likeUser === userData.id
              );
              this.posts[i].favorited = !!this.posts[i].favoritesListId.find(
                (favoriteId) => favoriteId === this.favoritesListId
              );
            }
          } else {
            console.warn("Nenhuma postagem encontrada na resposta da API.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar as postagens:", error);
        });
    },
    converterTexto(delta) {
      let text = "";
      delta.ops.forEach((op) => {
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
      sessionStorage.setItem("idPost", idPost);

      router.push({ path: "/post" });
    },
    async likeds(idPost) {
      // Pega o valor da sessionStorage
      const userId = sessionStorage.getItem("userId");

      //Faz a requisição HTTP
      const response = await http.put(`/post?id=${idPost}&liked=true`, {
        usersLikeID: [userId],
      });

      // Verifica se a requisição foi bem sucedida
      if (response.status === 200) {
        // Obtem os dados da resposta
        const data = response.data;

        const indexPostUpdate = this.posts.findIndex(
          (post) => post.id === idPost
        );

        if (
          this.posts[indexPostUpdate] &&
          this.posts[indexPostUpdate].hasOwnProperty("liked")
        ) {
          this.posts[indexPostUpdate].liked = true;
        } else {
          console.error(
            "Objeto ou propriedade não encontrada para atribuição."
          );
        }

        const userData = JSON.parse(sessionStorage.getItem("userData"));
        userData.postsLikedID.push(idPost);
        sessionStorage.setItem("userData", JSON.stringify(userData));
      } else {
        // A requisição falhou
        console.error("Erro ao mandar like:", response.statusText);
      }
    },
    async deslike(idPost) {
      // Pega o valor da sessionStorage
      const userId = sessionStorage.getItem("userId");

      //Faz a requisição HTTP
      const response = await http.put(`/post?id=${idPost}&liked=false`, {
        usersLikeID: [userId],
      });

      // Verifica se a requisição foi bem sucedida
      if (response.status === 200) {
        // Obtem os dados da resposta
        const data = response.data;

        const indexPostUpdate = this.posts.findIndex(
          (post) => post.id === idPost
        );

        if (
          this.posts[indexPostUpdate] &&
          this.posts[indexPostUpdate].hasOwnProperty("liked")
        ) {
          this.posts[indexPostUpdate].liked = false;
        } else {
          console.error(
            "Objeto ou propriedade não encontrada para atribuição."
          );
        }

        const userData = JSON.parse(sessionStorage.getItem("userData"));
        userData.postsLikedID.pop(idPost);
        sessionStorage.setItem("userData", JSON.stringify(userData));
      } else {
        // A requisição falhou
        console.error("Erro ao dar deslike:", response.statusText);
      }
    },
    async Fav(idPost) {
      // Pega o valor da sessionStorage
      const userId = sessionStorage.getItem("userId");

      //Faz a requisição HTTP
      const response = await http.put(
        `/favorites-list?id=${userId}&favorite=true`,
        {
          postsFavoritesId: [idPost],
        }
      );

      // Verifica se a requisição foi bem sucedida
      if (response.status === 200) {
        // Obtem os dados da resposta
        const data = response.data;

        const indexPostUpdate = this.posts.findIndex(
          (post) => post.id === idPost
        );

        if (
          this.posts[indexPostUpdate] &&
          this.posts[indexPostUpdate].hasOwnProperty("favorited")
        ) {
          this.posts[indexPostUpdate].favorited = true;
        } else {
          console.error(
            "Objeto ou propriedade não encontrada para atribuição."
          );
        }

        const userData = JSON.parse(sessionStorage.getItem("userData"));
        for (let i = 0; i < this.posts.length; i++) {
          if (this.posts[i].id == idPost) {
            this.posts[i].favoritesListId.pop(userId);
          }
        }
        sessionStorage.setItem("userData", JSON.stringify(userData));
      } else {
        // A requisição falhou
        console.error("Erro ao mandar fav:", response.statusText);
      }
    },
    async Unfav(idPost) {
      // Pega o valor da sessionStorage
      const userId = sessionStorage.getItem("userId");

      //Faz a requisição HTTP
      const response = await http.put(
        `/favorites-list?id=${userId}&favorite=false`,
        {
          postsFavoritesId: [idPost],
        }
      );

      // Verifica se a requisição foi bem sucedida
      if (response.status === 200) {
        // Obtem os dados da resposta
        const data = response.data;

        const indexPostUpdate = this.posts.findIndex(
          (post) => post.id === idPost
        );

        if (
          this.posts[indexPostUpdate] &&
          this.posts[indexPostUpdate].hasOwnProperty("favorited")
        ) {
          this.posts[indexPostUpdate].favorited = false;
        } else {
          console.error(
            "Objeto ou propriedade não encontrada para atribuição."
          );
        }

        const userData = JSON.parse(sessionStorage.getItem("userData"));
        sessionStorage.setItem("userData", JSON.stringify(userData));
      } else {
        // A requisição falhou
        console.error("Erro ao mandar like:", response.statusText);
      }
    },
  },
};
</script>
<style>
.body {
  width: 100%;
  height: 100%;
}

.button {
  background-color: #835d3d;
  color: #ffff;
}

.post {
  background-color: #f7cfcdb6 !important;
  border: 2px solid white;
}
</style>