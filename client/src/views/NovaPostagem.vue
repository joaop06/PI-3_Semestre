<template>
  <v-layout class="rounded rounded-md">
    <v-main>
      <v-layout class="editor d-flex align-center justify-center" row wrap>
        <v-form class="quilleditor">
          <v-flex>
            <QuillEditor v-model:content="contentDelta" toolbar="full" contentType="delta" />
          </v-flex>
          <v-flex>
            <v-btn type="button" @click="Salvar">Salvar</v-btn>
          </v-flex>
          <v-flex>
            <p v-html="convertedContent | filterText"></p>
          </v-flex>
        </v-form>
      </v-layout>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import { Delta, Quill } from '@vueup/vue-quill'

const drawerOpen = ref(false);
const editorRef = ref(null)
let naPag = ref('testando');

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

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

const Salvar = () => {
  const delta = contentDelta.value;
  naPag.value = new Delta(delta.ops.filter((op) => op.insert));
  console.log('na pag agr: ', naPag)
  // gb.post = deltaJSON;
  // const deltaJSON = JSON.stringify(delta);
  // console.log('aquivo já jsonado', deltaJSON);
  
  // console.log(content.value);
  // gb.post = content.value;
  // alert('deu certo, amigo')
  // console.log('conteudo salvo: ', gb.post)
};

const convertedContent = () => {
  let convertido = editorRef.value.quill.clipboard.convert(contentDelta.value)
  console.log('converte', convertido);
}


const filterText = (content) => {
  let filtrado = content.filter((op) => op.insert);
  console.log(filtrado);
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
