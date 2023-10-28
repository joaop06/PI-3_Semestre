<template>
  <div class="tudo">
    <div class="imagem" app>
      <v-spacer></v-spacer>
      <v-img src="../assets/lilica.png" width="300" height="300"></v-img>
    </div>
    <div class="content">
      <v-toolbar-items class="mx-auto">
        <v-tabs centered color=#835D3D>
          <v-tab class="items" v-for="menu in (user === 'admin' ? menuItemsAdmin : menuItems)" :key="menu"
            :text="menu.title" :to="menu.route"></v-tab>
        </v-tabs>
      </v-toolbar-items>
      <v-avatar class="avatar">
        <v-icon icon="mdi-login" color=#835D3D></v-icon>
      </v-avatar>
    </div>
  </div>
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
        { title: 'Aleatoriedades', route: '/' },
        { title: 'Livros', route: '/' },
        { title: 'Filmes & Séries', route: '/' },
        { title: 'Música', route: '/' },
        { title: 'Comidinhas', route: '/' }
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
.tudo{
  background-color: #F7CFCD;
}
.avatar{
  border: 1px solid black;  
  margin: 2px;
}
.items {
  font-family: 'Rockwell';
}

.imagem {
  display: flex;
  margin: auto;
  height: 100px;
  width: 400px;
}

.content {
  display: flex;
  justify-content: center;
}
</style>