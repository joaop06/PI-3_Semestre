<template>
  <navbar />
  <v-app id="inspire">
    <div class="grid-container">
      <!-- <v-container fluid class="container">
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
      </v-container> -->
      <div class="grid-item" id="item1">
        <v-card class="cards" variant="tonal">
          <v-card-title class="title">Card Title</v-card-title>
          <v-card-text class="text">{{ textoCompleto }}</v-card-text>
          <v-card-actions>
            <v-btn class="buttonB">Continuar lendo</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="grid-item" id="item2">
        <v-card class="cards" variant="tonal">
          <v-card-title class="title">Card Title</v-card-title>
          <v-card-text class="text">{{ textoCompleto }}</v-card-text>
          <v-card-actions>
            <v-btn class="buttonB">Continuar lendo</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="grid-item" id="item3">
        <v-card class="cards" variant="tonal">
          <v-card-title class="title">Card Title</v-card-title>
          <v-card-text class="text">{{ textoCompleto }}</v-card-text>
          <v-card-actions>
            <v-btn class="buttonB">Continuar lendo</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="grid-item" id="item4">
        <v-card class="cards" variant="tonal">
          <v-card-title class="title">Card Title</v-card-title>
          <v-card-text class="text">{{textoCompleto}}</v-card-text>
          <v-card-actions id="buttonP">
            <v-btn class="buttonB">Continuar lendo</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="grid-item" id="item5">
        <v-card class="cards" variant="tonal">
          <v-card-title class="title">Card Title</v-card-title>
          <v-card-text class="text">{{ textoCompleto }}</v-card-text>
          <v-card-actions>
            <v-btn class="buttonB">Continuar lendo</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="grid-item" id="item6">
        <v-card class="cards" variant="tonal">
          <v-card-title class="title">Card Title</v-card-title>
          <v-card-text class="text">{{ textoCompleto }}</v-card-text>
          <v-card-actions>
            <v-btn class="buttonB">Continuar lendo</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="grid-item" id="item7">
        <v-card class="cards" variant="tonal">
          <v-card-title class="title">Card Title</v-card-title>
          <v-card-text class="text">{{ textoCompleto }}</v-card-text>
          <v-card-actions>
            <v-btn class="buttonB">Continuar lendo</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<style>
.grid-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  background-color: #ffffff;
  padding: 30px;
}

.grid-item {
  background-color: #f7cfcdb6;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 10px;
  font-size: 30px;
  text-align: center;
}

.cards {
  width: 100%;
  height: 100%;
}

#buttonP {
  margin-top: 100%;
}

.buttonB{
  border: 1px solid white;
  background-color: #835D3D;
  color: white;
  font-family: 'Balsamiq Sans', sans-serif;
  font-weight: bold;
}

#item1 {
  grid-row: span 2;
  grid-column: span 2;
}

#item2 {
  grid-row: span 3;
  grid-column: span 1;
}

#item3 {
  grid-row: span 3;
  grid-column: span 1;
}

#item4 {
  grid-row: span 10;
  grid-column: span 2;
}

#item5 {
  grid-row: span 8;
  grid-column: span 1;
}

#item6 {
  grid-row: span 8;
  grid-column: span 1;
}

#item7 {
  grid-row: span 6;
  grid-column: span 2;
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
      textoCompleto:
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