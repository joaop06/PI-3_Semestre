<template>
    <div>
        <h3 class="d-flex">{{ clock }}</h3>
        <h2 class="d-flex justify-center">{{ titulo }}</h2><br>
        <div class="quilleditor_text" ref="editor" /><br>
    </div>
</template>
  
<script>
import http from '@/http';
import { ref } from 'vue';
import axios from 'axios'
import Quill from 'quill';
import { Delta } from '@vueup/vue-quill';
import sergio from '@/controller/globalVariables';
import { initCustomFormatter } from 'vue';
import { format } from 'date-fns';

export default {
    data() {
        return {
            titulo: '',
            assunto: '',
            post: '',
            updateAt: '',
            clock: ''
        }
    },
    mounted() {
        const quillOptions = {
            theme: 'bubble',
            modules: {
            },
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

        try {

            // const other = new Delta(JSON.parse(jsonado)); //pra transformar de volta em delta
            console.log('id dentro do post: ', sergio.id);

            http.get(`/post?id=${sergio.id}`)
                .then(response => {
                    const jstring = JSON.stringify(...response.data.rows);
                    const jsonado = JSON.parse(jstring)
                    this.titulo = jsonado.title
                    this.updateAt = jsonado.updateAt;
                    this.formatDate(this.updateAt)
                    const ops = JSON.parse(jsonado.contentPost).ops;
                    const delta = new Delta(ops);
                    // console.log('post desconstruido', other);
                    this.quill.setContents(delta);
                })

        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        formatDate(isoDate) {
            // Função para formatar a data no padrão brasileiro (dd/mm/yyyy)
            this.clock = format(new Date(isoDate), 'dd/MM/yyyy');
        },
        async setEditorCOntent(content) {
            try {
                console.log('conteudo', content);
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
    border: 4px solid black;
}
</style>
