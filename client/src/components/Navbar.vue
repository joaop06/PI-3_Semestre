<template>
  <v-app-bar class="px-3" flat density="compact" scroll-behavior="hide">
    <!-- atributo image poem uma imagem na navbar image="https://picsum.photos/1920/1080?random" -->
    <v-avatar color="grey-darken-1" class="hidden-md-and-up" size="32"></v-avatar>

    <v-spacer></v-spacer>

    <v-tabs centered color="grey-darken-2">
      <v-tab class="items" v-for="menu in (user === 'admin' ? menuItemsAdmin : menuItems)" :key="menu" :text="menu.title" :to="menu.route"></v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32"></v-avatar>
  </v-app-bar>
</template>
<script>
import gb from '@/controller/globalVariables'

export default {
  components: {

  },
  data() {
    return {
      drawerOpen: false,
      content: '',
      user: '',
      menuItemsAdmin: [
        { title: 'Home', route: '/' },
        { title: 'Postagens', route: '/posts' },
        { title: 'Conta', route: '/dashboard' },
        { title: 'Nova Postagem', route: '/newpost' }
      ],
      menuItems: [
        { title: 'Home', route: '/' },
        { title: 'Postagens', route: '/posts' },
        { title: 'Conta', route: '/dashboard' },
      ]
    };
  },
  mounted (){
    this.user = 'client';
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    }
  }
};
</script>

<style>
.items{
  font-family: 'Rockwell';
}
</style>