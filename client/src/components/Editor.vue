<template>
    <div>
        <div class="quilleditor_text" ref="editor" /><br>
        <v-btn class="buttonPost" @click.prevent="getEditorContent" append-icon="mdi-post" variant="tonal" rounded="10px">
            POST
        </v-btn><br>
        <!-- <v-btn class="buttonPost" @click.prevent="setEditorCOntent" append-icon="mdi-post" variant="tonal" rounded="10px">
            POST
        </v-btn><br> -->
        <v-dialog v-model="inputDialog" class="w-50">
            <v-card>
                <br>
                <v-card-title>Informações do POST</v-card-title>
                <v-text-field class="mx-2" clearable label="Titulo:" variant="outlined" v-model="titulo"></v-text-field>
                <v-text-field class="mx-2" clearable label="Descrição:" variant="outlined"
                    v-model="description"></v-text-field>
                <v-card-actions>
                    <v-btn color="primary" @click="successDialog = true">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


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
import axios from 'axios'
import Quill from 'quill';
import { Delta } from '@vueup/vue-quill';
import gb from '@/controller/globalVariables';
import { initCustomFormatter } from 'vue';

export default {
    data() {
        return {
            successDialog: false,
            errorDialog: false,
            inputDialog: false,
            titulo: 'titulo',
            description: 'descricao'
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
                    ['blockquote'],
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
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
                'blockquote'
            ],
        };

        // Inicialize o Quill Editor no elemento com a referência 'editor'
        this.quill = new Quill(this.$refs.editor, quillOptions);
    },
    methods: {
        async getEditorContent() {
            // Use o método getContents para obter o conteúdo do editor
            //melhorar essa logica para adicionar o titulo e descrição
            // this.inputDialog = true;
            // if (!this.inputDialog) {
                try {
                    const content = this.quill.getContents();
                    const jsonado = JSON.stringify(content);
                    console.log(content)
                    const other = new Delta(JSON.parse(jsonado)); //pra transformar de volta em delta
                    gb.varteste = other;
                    this.successDialog = true;

                    const form = {
                        title: this.titulo,
                        description: this.description,
                        contentPost: jsonado
                    }

                    console.log(form);

                    await axios.post('http://192.168.152.49:7000/post', form)
                        .then(response => {
                            console.log('deu certo')
                        })

                    await this.$nextTick();
                    console.log('delta: ', gb.varteste);
                    this.clearContent();
                } catch (error) {
                    console.log(error)
                    this.errorDialog = true;
                }
            // }

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
