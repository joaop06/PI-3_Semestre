<template>
    <v-app-bar color="red pa-2" :elevation="4" scroll-behavior="elevate">
      <v-row no-gutters justify="center" align="center">
          <v-col cols="12">
          <v-toolbar-title class="text-button text-white" id="titulo">
            <v-icon @click="toggleDrawer">mdi-menu</v-icon>
          </v-toolbar-title>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="drawerOpen" temporary>
      <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route">
        <br>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>
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