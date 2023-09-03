<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// Importe os componentes que você deseja usar
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  data() {
    return {

    }
  },
  // created() {
  //   // Importa o objeto $route do Vue Router
  //   const { $route } = this.$route
  //   console.log($route.path) // Verifica o caminho da rota atual
  // },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>
