<template>
  <navbar/>
    <v-app id="inspire">
    <v-main class="">
      <v-container fluid class="container">
        <v-row class="linha" wrap>
          <v-col
            v-for="post in posts"
            :key="post.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="conteudoColuna"
          >
          <v-card class="cards" title="Card title" text="..." variant="tonal">
            <v-card-actions>
              <v-btn>Click me</v-btn>
            </v-card-actions>
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.container {
  background-color: white;
  height: 100%;
}

.linha {
  display: flex;
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
  font-family: "Open Sans";
}
</style>

<script>
import bd from "@/tests/banco.json";
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      textocompleto:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur recusandae maxime repellat quas quaerat necessitatibus ea commodi. Minus totam nobis repellendus laboriosam ullam autem debitis, pariatur perspiciatis, atque ipsam quo.", //variavel para pegar o texto futuramente
      limiteCaracteres: 150, //limitador dos caracteres
      posts: bd,
    };
  },
  computed: {
    //com esta função, posso resumir o texto apresentado no v-card
    textoLimitado() {
      if (this.textocompleto.length > this.limiteCaracteres) {
        return this.textocompleto.slice(0, this.limiteCaracteres) + "...";
      } else {
        return this.textocompleto;
      }
    },
  },
};
</script>