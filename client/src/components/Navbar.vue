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
      <v-btn class="avatar" icon="mdi-account-outline" size="small" @click="temLogin()"></v-btn>
    </div>
  </div>
</template>
<script>
import gb from '@/controller/globalVariables'
import router from "@/router/index";
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
        { title: 'Aleatoriedades', route: '/aleatoriedades' },
        { title: 'Livros', route: '/livros' },
        { title: 'Filmes & Séries', route: '/filmeserie' },
        { title: 'Música', route: '/musica' },
        { title: 'Comidinhas', route: '/comidas' }
      ]
    };
  },
  mounted() {
    console.log('mounted navbar', sessionStorage.getItem('typeUser'));
    this.updateUserMenu();
  },
  methods: {
    
    //função para verificar se ele já está logado, caso esteja, redireciona
    //para dashboard, caso não esteja, vai para login
    temLogin() {
      let route = '';

      if(!sessionStorage.getItem('userData')){
        route = 'Login';
      }
      else{
        route = 'Conta';
      }

      router.push({ name: `${route}` });
    },
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    updateUserMenu() {
      let typeUser = sessionStorage.getItem('typeUser');
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
  border: 1px solid black !important;  
  margin: 2px;
  background-color: #F7CFCD !important;
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