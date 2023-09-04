<template>
  <v-app-bar class="px-3" flat density="compact" scroll-behavior="hide">
    <v-avatar color="grey-darken-1" class="hidden-md-and-up" size="32"></v-avatar>

    <v-spacer></v-spacer>

    <v-tabs centered color="grey-darken-2">
      <v-tab v-for="menu in menuItems" :key="menu" :text="menu.title"></v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32"></v-avatar>
  </v-app-bar>
</template>
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