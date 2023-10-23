<template>
  <v-app-bar class="d-flex h-50" flat scroll-behavior="hide">
    <v-container fluid class="contei">
      <!-- <v-img :width="200" :height="200" class="imagem" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img> -->
      <v-row class="bg-primary">
        <v-col cols="12">
          <div>
            <p>oi</p>
          </div>
        </v-col>
      </v-row>
      <v-row class="bg-green">
        <v-col cols="12">
          <div>
            <p>oi</p>
          </div>
        </v-col>
      </v-row>
      <v-row class="bg-yellow">
        <v-col cols="12">
          <div>
            <p>oi</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-spacer></v-spacer>
      
    <v-tabs centered color="grey-darken-2">
      <v-tab class="items" v-for="menu in (user === 'admin' ? menuItemsAdmin : menuItems)" :key="menu" :text="menu.title"
        :to="menu.route"></v-tab>
    </v-tabs>
    <v-spacer></v-spacer> -->
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

.contei {
  margin: auto;
  position: fixed;
}

.imagem {
  position: fixed;
  z-index: 1000;
  background-color: red;
  bottom: -150px;
}
</style>