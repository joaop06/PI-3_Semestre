<template>
  <v-app>
    <v-main>
      <router-view />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
// Importe os componentes que você deseja usar
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Rodape.vue'
import gb from '@/controller/globalVariables'
import { nextTick, watch } from 'vue';

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  //preciso atualizar o componente Navbar de alguma forma para que ele receba as informações do usuario
}
</script>
<style>
@font-face {
  font-family: 'Balsamiq Sans';
  src: url('./fonts/BalsamiqSans-Regular.ttf') format('ttf');
}
</style>
