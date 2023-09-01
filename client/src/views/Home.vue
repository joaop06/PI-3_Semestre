<template>
  <v-layout class="rounded rounded-md">

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

    <v-main>
      <v-layout class="editor d-flex align-center justify-center" row wrap>
        <v-flex xs12 class="quilleditor">
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
  height: 80%;
  width: 77%;
  padding: 0;
  margin-right: 0;
}
.quilleditor_text {
  background-color: white;
  height: 90%;
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
