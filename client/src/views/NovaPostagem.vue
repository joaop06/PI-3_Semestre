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
            {{ naPag }}
          </v-flex>
        </v-form>
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

<script setup>
import gb from '@/controller/globalVariables';
import { ref } from 'vue'
import { Delta, Quill } from '@vueup/vue-quill'

const drawerOpen = ref(false);
const naPag = ref('testando');

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
  console.log(delta);
  // gb.post = deltaJSON;
  const deltaJSON = JSON.stringify(delta);
  console.log('aquivo já jsonado', deltaJSON);

  // console.log(content.value);
  // gb.post = content.value;
  // alert('deu certo, amigo')
  // console.log('conteudo salvo: ', gb.post)
};
</script>

<!-- <script setup>
import { ref } from 'vue'
import { Delta } from '@vueup/vue-quill'
const contentDelta = ref(
  new Delta([
    { insert: 'Gandalf', attributes: { bold: true } },
    { insert: ' the ' },
    { insert: 'Grey', attributes: { color: '#ccc' } },
  ])
)
const contentHTML = ref('<h1>This is html header</h1>')
const contentText = ref('This is just plain text')
</script>

<template>
  <div>
    <h2>Delta</h2>
    <QuillEditor v-model:content="contentDelta" toolbar="full" contentType="delta" />
    <pre v-highlightjs><code class="json">{{ contentDelta }}</code></pre>
    <br />
  </div>
</template>

<style scoped></style> -->

  