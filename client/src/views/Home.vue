<template>
  <v-app id="inspire">

    <v-main class="bg-primary">
      <v-container fluid class="container">
        <v-row class="linha">
          <v-col v-for="post in posts" :key="post.id" cols="12" md="8" class="conteudoColuna">
            <v-card class="cards">
              <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                cover>
                <v-card-title>Top 10 Australian beaches</v-card-title>
              </v-img>

              <v-card-text>
                {{ textoLimitado }}
              </v-card-text>

              <v-card-actions>
                <v-btn class="bg-primary" color="orange">
                  CONTINUAR LENDO
                </v-btn>
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
  background-color: blue;
  height: 100%;
}

.linha {
  background-color: pink;
  height: 90vh;
  margin: auto;
  border-radius: 10px;
}

.coluna {
  width: 100vw;
  background-color: green;
}

.cards {
  max-width: 400px;
  max-height: 400px;
}
</style>

<script>

import bd from '@/'

export default {
  data() {
    return {
      textocompleto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur recusandae maxime repellat quas quaerat necessitatibus ea commodi. Minus totam nobis repellendus laboriosam ullam autem debitis, pariatur perspiciatis, atque ipsam quo.', //variavel para pegar o texto futuramente
      limiteCaracteres: 150 //limitador dos caracteres
    };
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