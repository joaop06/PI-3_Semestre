<template>
    <div>
        <div class="quilleditor_text" ref="editor" /><br>
        <v-btn class="buttonPost" @click.prevent="getEditorContent" append-icon="mdi-post" variant="tonal" rounded="10px">
            POST
        </v-btn><br>

        <v-dialog v-model="successDialog" class="w-50">
            <v-card>
                <v-card-title>Sucesso!</v-card-title>
                <v-card-text>
                    Sua postagem foi realizada com sucesso.
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="successDialog = false">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="errorDialog" class="w-50">
            <v-card>
                <v-card-title>Falha!</v-card-title>
                <v-card-text>
                    Não foi possível realizar o post
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="errorDialog = false">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import Quill from 'quill';
import gb from '@/controller/globalVariables';

export default {
    data() {
        return {
            successDialog: false,
            errorDialog: false
        }
    },
    mounted() {

        //consertar funcionalidades de cor, fundo de cor, tamanho da fonte, citação e recuo

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
            try {
                const content = this.quill.getContents();
                gb.varteste = content;
                await this.$nextTick();
                this.successDialog = true;
                this.clearContent();
            } catch (error) {
                console.log(error)
                this.errorDialog = true;
            }

        },
        async clearContent() {
            this.quill.setText('');
            console.log('limpo');
        },
        // async setEditorCOntent() { 
        //     try {
        //         console.log(gb.varteste);
        //         this.quill.setContents(gb.varteste);
        //     } catch (error) {
        //         console.error(error)
        //     }
        // }
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
</style>
