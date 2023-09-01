<template>
<v-main>
    <v-layout class="editor d-flex align-center justify-center" row wrap>
      <v-flex xs12 class="quilleditor">
        <QuillEditor class="quilleditor" v-model="content" theme="snow" />
      </v-flex>
    </v-layout>
</v-main>
</template>

<style>
.editor {
  background-color: rgb(8, 255, 82) !important;
  height: 39rem;
  width: 100%;
}

.quilleditor {
  background-color: white;
  height: 90% ;
  width: 97% ;
  padding: 0; /* Remove padding to eliminate unnecessary space */
  margin-right: 0;
}
</style>

<script>

export default {
  components: {

  },
  data() {
    return {
      content: '',
    }
  }
};
</script>