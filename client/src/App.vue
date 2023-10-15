<template>
  <v-app>
    <v-main>
      <Navbar :user-type="userType"/>
      <router-view />
      <Footer/>
    </v-main>
  </v-app>
</template>

<script>
// Importe os componentes que você deseja usar
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Rodape.vue'
import gb from '@/controller/globalVariables'

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      userType: gb.typeUser,
    }
  },
  // created() {
  //   // Importa o objeto $route do Vue Router
  //   const { $route } = this.$route
  //   console.log($route.path) // Verifica o caminho da rota atual
  // },
  mounted() {
    window.scrollTo(0, 0);
  },
  //preciso atualizar o componente Navbar de alguma forma para que ele receba as informações do usuario
  computed(){
    this.user = gb.typeUser;
    console.log(gb.typeUser);
  }
}
</script>
