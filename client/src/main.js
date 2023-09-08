/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Vue from 'vue'


// Composables
import { createApp } from 'vue'


// Plugins
import { QuillEditor } from '@vueup/vue-quill'
import Editor from 'vue-editor-js';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { registerPlugins } from '@/plugins';

const app = createApp(App)




registerPlugins(app)


app.mount('#app')
app.component('QuillEditor', QuillEditor)
