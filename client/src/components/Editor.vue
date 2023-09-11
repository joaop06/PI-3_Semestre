<template>
    <div>
        <div ref="editor" />
        <button @click.prevent="getEditorContent">Obter Conteúdo</button><br>
        <button @click.prevent="clearContent">Limpar Conteúdo</button><br>
        <button @click.prevent="setEditorCOntent">Mostrar Conteúdo</button>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import Quill from 'quill';
import gb from '@/controller/globalVariables';

export default {
    mounted() {
        const quillOptions = {
            theme: 'snow', // Escolha um tema
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    [{ align: [] }],
                    ['clean'],
                ],
            },
            placeholder: 'Digite aqui...',
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
        async clearContent(){
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
