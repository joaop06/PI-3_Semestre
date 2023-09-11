<template>
    <div>
        <div class="quilleditor_text" ref="editor" /><br>
        <button class="buttonPost" @click.prevent="getEditorContent">POSTAR</button><br>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import Quill from 'quill';
import gb from '@/controller/globalVariables';

export default {
    mounted() {
        const quillOptions = {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }], 
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],                       
                    ['image', 'link'] 
                ],
            },
            placeholder: 'Faça sua postagem...',
            readOnly: false,
            bounds: document.body,
            scrollingContainer: null,
            strict: true,
            formats: [
                'header',
                'font',
                'bold',
                'italic',
                'underline',
                'strike',
                'list',
                'link',
                'image',
                'align',
            ],
        };

        // Inicialize o Quill Editor no elemento com a referência 'editor'
        this.quill = new Quill(this.$refs.editor, quillOptions);
    },
    methods: {
        async getEditorContent() {
            // Use o método getContents para obter o conteúdo do editor
            const content = this.quill.getContents();
            gb.varteste = content;
            const texto = this.quill.getText();
            await this.$nextTick();
            console.log('conteudo: ', content);
            console.log('conteudo nas global: ', gb.varteste);
            console.log('texto: ', texto);
        },
        async clearContent() {
            this.quill.setText('');
            console.log('limpo');
        },
        async setEditorCOntent() {
            try {
                console.log(gb.varteste);
                this.quill.setContents(gb.varteste);
            } catch (error) {
                console.error(error)
            }
        }
    },
};
</script>

<style>

.quilleditor_text {
    background-color: white;
    height: 90%;
    width: 100%;
}

.buttonPost{
    background-color: rgb(0, 241, 221);
    width: 150px;
    height: 30px;
    border-radius: 10px;
}
</style>
