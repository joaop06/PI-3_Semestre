/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'


// Composables
import { createApp } from 'vue'


// Plugins
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { registerPlugins } from '@/plugins';

const app = createApp(App)
registerPlugins(app)

const globalOptions = {
    debug: 'info',
    modules: {
      
    },
    placeholder: 'Compose an epic...',
    readOnly: false,
    theme: 'snow'
  }
  // set default globalOptions prop
QuillEditor.props.globalOptions.default = () => globalOptions



app.mount('#app')
app.component('QuillEditor', QuillEditor)
