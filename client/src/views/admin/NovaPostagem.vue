<template>
  <Navbar />
  <v-layout class="layout rounded rounded-md h-100">
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

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<script setup>
import { ref } from 'vue'
import QuillEditor from '@/components/Editor.vue'

const drawerOpen = ref(false);

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

</script>

<style>
.layout {
  background-color:  rgb(248, 196, 194);
}

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
}
</style>
