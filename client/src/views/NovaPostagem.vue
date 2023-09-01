<template>
    <v-layout class="rounded rounded-md">  
      <v-main>
        <v-layout class="editor d-flex align-center justify-center" row wrap>
          <v-flex class="quilleditor">
            <QuillEditor class="quilleditor_text" v-model="content" theme="snow" />
          </v-flex>
        </v-layout>
      </v-main>
    </v-layout>
  </template>
  
  <style>
  .editor {
    background-color: rgb(8, 255, 82) !important;
    height: 39rem;
    width: 100%;
  }
  
  .quilleditor {
    background-color: white;
    height: 70%;
    width: 80%;
    margin-right: 0;
    margin-top: -100px !important;
  }
  
  .quilleditor_text {
    background-color: white;
    height: 100%;
    width: 100%;
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
        ],
      };
    },
    methods: {
      toggleDrawer() {
        this.drawerOpen = !this.drawerOpen;
      }
    }
  };
  </script>
  