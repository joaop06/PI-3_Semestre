<template>
    <div>
        <div class="quilleditor_text" ref="editor" /><br>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import axios from 'axios'
import Quill from 'quill';
import { Delta } from '@vueup/vue-quill';
import gb from '@/controller/globalVariables';
import { initCustomFormatter } from 'vue';

export default {
    data() {
        return {
            titulo: '',
            assunto: '',
            post: ''
        }
    },
    mounted() {
        const quillOptions = {
            theme: 'bubble',
            modules: {
            },
            placeholder: ' ',
            readOnly: true,
            bounds: document.body,
            scrollingContainer: null,
            strict: true,
            formats: [
                'header',
                'color',
                'size',
                'background',
                'font',
                'bold',
                'italic',
                'underline',
                'strike',
                'list',
                'link',
                'image',
                'indent',
                'align',
                'blockquote',
            ],
        };

        // Inicialize o Quill Editor no elemento com a referência 'editor'
        this.quill = new Quill(this.$refs.editor, quillOptions);
    },
    methods: {
        async getEditorContent() {
            try {

                // const other = new Delta(JSON.parse(jsonado)); //pra transformar de volta em delta

                console.log(form);

                await axios.get('http://localhost:7000/post')
                    .then(response => {
                        this.titulo = response.title;
                        this.post = response.contentPost;
                        this.assunto = response.typePost;

                        console.log(this.titulo);
                        console.log(this.post);
                        console.log(this.assunto);
                    })
                    const other = new Delta(JSON.parse(this.post));
                    this.setEditorCOntent(other);

            } catch (error) {
                console.log(error)
            }
            // }

        },
        async setEditorCOntent(content) { 
            try {
                console.log(content);
                this.quill.setContents(content);
            } catch (error) {
                console.error(error)
            }
        }
        //readiociona o delta no editor para mostrar o post
    },
};
</script>

<style>
.quilleditor_text {
    background-color: white;
    height: 90%;
    width: 100%;
    border-radius: 10px;
}

.buttonPost {
    background-color: rgb(0, 241, 221);
    width: 150px;
    height: 30px;
}

.ql-font-roboto {
    font-family: 'Roboto', sans-serif;
  }
</style>
