<template>
  <v-app-bar class="px-3" flat density="compact" scroll-behavior="hide">
    <!-- atributo image poem uma imagem na navbar image="https://picsum.photos/1920/1080?random" -->
    <v-avatar color="grey-darken-1" class="hidden-md-and-up" size="32"></v-avatar>

    <v-spacer></v-spacer>

    <v-tabs centered color="grey-darken-2">
      <v-tab class="items" v-for="menu in (userType === 'admin' ? menuItemsAdmin : menuItems)" :key="menu" :text="menu.title" :to="menu.route"></v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32"></v-avatar>
  </v-app-bar>
</template>
<script>
import gb from '@/controller/globalVariables'
import store from '@/store'

export default {
  props: ['userType'],
  data() {
    return {
      drawerOpen: false,
      content: '',
      user: '',
      userMenu: [],
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
  mounted() {
    this.userType = store.getters.getUser
    this.updateUserMenu();  // Atualize o menu quando o componente for criado
  },
  watch: {
    userType: 'updateUserMenu' // Monitora userType e chama updateUserMenu quando ele mudar
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    updateUserMenu() {
      // Verifique o tipo de usuário e atualize o menu com base nisso
      console.log('chegou aqui', this.userType)
      if (this.userType === 'admin') {
        this.userMenu = [
          { title: 'Home', route: '/' },
          { title: 'Postagens', route: '/posts' },
          { title: 'Conta', route: '/dashboard' },
          { title: 'Nova Postagem', route: '/newpost' }
        ];
      } else {
        this.userMenu = [
          { title: 'Home', route: '/' },
          { title: 'Postagens', route: '/posts' },
          { title: 'Conta', route: '/dashboard' },
        ];
      }
    }
  }
};
</script>

<style>
.items{
  font-family: 'Rockwell';
}
</style>