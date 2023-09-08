<template>
  <v-layout class="rounded rounded-md">
    <v-main>
      <v-layout class="editor d-flex align-center justify-center" row wrap>
        <v-form class="quilleditor">
          <v-flex>
            <QuillEditor v-model:content="contentDelta" toolbar="full" contentType="delta"/>
          </v-flex>
          <v-flex>
            <v-btn type="button" @click="Salvar">Salvar</v-btn>
          </v-flex>
          <v-flex>
            <!-- <p v-html="convertedContent"></p> -->
          </v-flex>
        </v-form>
      </v-layout>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import gb from '@/controller/globalVariables'
import { Delta, Quill, QuillEditor } from '@vueup/vue-quill'

const drawerOpen = ref(false);
// let naPag = ref('testando');
// let deltaJSON = ref(null);

const menuItems = [
  { title: 'Nova postagem', route: '/newpost' },
  { title: 'Postagens', route: '/postagens' },
  { title: 'Conta', route: '/dashboard' },
  { title: 'Home', route: '/inicio' }
];

const contentDelta = ref(
  new Delta([
    { insert: 'Gandalf', attributes: { bold: true } },
    { insert: ' the ' },
    { insert: 'Grey', attributes: { color: '#ccc' } },
  ])
)

const globalOptions = {
    debug: 'info',
    modules: {
      
    },
    placeholder: 'Compose an epic...',
    readOnly: false,
    theme: 'snow'
  }

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

const Salvar = () => {

  const delta = contentDelta.value.ops;
  console.log('valor do delta',delta)


  // const delta = contentDelta.value;
  // naPag.value = new Delta(delta.ops.values);
  // console.log('na pag agr: ', naPag)

  // deltaJSON = JSON.stringify(delta);
  // gb.post = deltaJSON;

  // console.log('aquivo já jsonado', deltaJSON);
};

const convertedContent = () => {

}

</script>

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