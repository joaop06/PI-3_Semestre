<template>
  <v-layout class="rounded rounded-md bg-primary h-100">
    <v-main>
      <v-layout class="editor align-center justify-center h1--" row wrap>
        <v-form class="quilleditor">
          <v-flex>
            <QuillEditor class="quilleditor_text rounded"></QuillEditor>
          </v-flex>
        </v-form>
      </v-layout>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import QuillEditor from '@/components/Editor.vue'

const drawerOpen = ref(false);

const menuItems = [
  { title: 'Nova postagem', route: '/newpost' },
  { title: 'Postagens', route: '/postagens' },
  { title: 'Conta', route: '/dashboard' },
  { title: 'Home', route: '/inicio' }
];

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

</script>

<style>
.editor {
  height: 39rem;
  width: 100%;
}

.quilleditor {
  height: 70%;
  width: 80%;
  margin-right: 0;
  margin-top: -100px !important;
}

.quilleditor_text {
  background-color: white;
  height: 90%;
  width: 100%;
  border-radius: 10px;
}
</style>
