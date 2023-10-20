<template>
  <v-app-bar class="px-3" flat density="compact" scroll-behavior="hide">

    <v-spacer></v-spacer>

    <v-tabs centered color="grey-darken-2">
      <v-tab class="items" v-for="menu in (user === 'admin' ? menuItemsAdmin : menuItems)" :key="menu" :text="menu.title"
        :to="menu.route"></v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <v-menu width="200px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="brown" size="2.5rem">
            <span class="text-h5">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="brown">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text">
              Edit Account
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text">
              Disconnect
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script>
import gb from '@/controller/globalVariables'
import { ref, watch } from 'vue'
// import store from '@/store'

//optei por importar o componente em cada view, assim posso fazer com que ele rendenize corretamente
//o problema é a reutilização dos códigos, entretanto, declarando em App.vue ele não estava sendo reativo

export default {
  data() {
    return {
      drawerOpen: false,
      content: '',
      user: '',
      userMenu: [],
      teste: null,
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
    console.log('mounted navbar', localStorage.getItem('typeUser'));
    this.updateUserMenu();
  },
  methods: {
    temLogin() {
      //fazer uma função para verificar se está logado, mostrando as opções corretas no avatar
    },
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    updateUserMenu() {
      let typeUser = localStorage.getItem('typeUser');
      console.log(typeUser);
      if (typeUser === 'admin') {
        this.user = typeUser;
      } else {
        this.user = typeUser;
      }
    }
  }
};
</script>

<style>
.items {
  font-family: 'Rockwell';
}
</style>