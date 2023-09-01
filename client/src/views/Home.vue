<template>
  <v-layout class="rounded rounded-md">
    <h1 class="ma-4 ml-0">seja bem vindo</h1>
  </v-layout>
</template>

<style>
body{
  background-color: aquamarine;
}
</style>

<script>
export default {
  components: {

  },
  data() {
    return {
      drawerOpen: false,
      content: '',
      menuItems: [
        { title: 'Nova postagem', route: '/newpost' },
        { title: 'Postagens', route: '/postagens' },
        { title: 'Conta', route: '/dashboard' },
        { title: 'Home', route: '/inicio' }
      ]
    };
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    }
  }
};
</script>
