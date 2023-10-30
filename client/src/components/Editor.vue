<template>
    <div>
        <div class="quilleditor_text" ref="editor" />
        <br>
        <div>{{caracter}}/{{tamanho}}</div><br>
        <v-btn class="buttonPost" @click.prevent="getDialog" append-icon="mdi-post" variant="tonal" rounded="10px">
            POST
        </v-btn><br>
        <v-dialog v-model="inputDialog" class="w-50">
            <v-card>
                <br>
                <v-card-title>Informações do POST</v-card-title>
                <v-text-field class="mx-2" clearable label="Titulo:" variant="outlined" v-model="titulo"></v-text-field>
                <v-select chips label="Select" :items="['Aleatorios', 'Livros', 'Audiovisuais', 'Musicas', 'Comidas']"
                    variant="outlined" v-model="assunto" class="mx-2"></v-select>
                <v-card-actions>
                    <v-btn color="primary" @click="getEditorContent">Finalizar</v-btn>
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
import http from '@/http'
import Quill from 'quill';
import { Delta } from '@vueup/vue-quill';
import gb from '@/controller/globalVariables';
import { initCustomFormatter } from 'vue';

import BlotFormatter from "quill-blot-formatter";
import ImageCompress from 'quill-image-compress';


export default {
    data() {
        return {
            successDialog: false,
            errorDialog: false,
            inputDialog: false,
            titulo: '',
            caracter: 0,
            tamanho: 400,
            assunto: '',
            usuario: ''
        }
    },
    mounted() {
        this.usuario = sessionStorage.getItem('userId');
        console.log('user Id', this.usuario);

        Quill.register('modules/blotFormatter', BlotFormatter);
        Quill.register('modules/imageCompress', ImageCompress);

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
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    ['image', 'link']
                ],
                blotFormatter: {},
                imageCompress: {
                    quality: 0.9,
                    maxWidth: 300,
                    maxHeight: 300,
                    imageType: 'image/jpeg',
                    suppressErrorLogging: false,
                    insertIntoEditor: undefined,
                }
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
                'blockquote',
            ],
        };

        // Inicialize o Quill Editor no elemento com a referência 'editor'
        this.quill = new Quill(this.$refs.editor, quillOptions);
        this.quill.on('text-change', this.handleTextChange);

    },
    methods: {
        handleTextChange(delta, oldDelta, source) {
            const maxLength = this.tamanho;
            const text = this.quill.getText();
            this.caracter = text.length;
            
            if (text.length > maxLength) {
                this.quill.deleteText(maxLength - 1, text.length);
            }
        },
        getDialog() {
            this.inputDialog = true;
        },
        async getEditorContent() {
            this.inputDialog = false;
            try {
                const content = this.quill.getContents();
                const jsonado = JSON.stringify(content);


                // const other = new Delta(JSON.parse(jsonado)); //pra transformar de volta em delta
                // gb.varteste = other;
                this.successDialog = true;

                const form = {
                    user_id: this.usuario,
                    title: this.titulo,
                    contentPost: jsonado,
                    typePost: this.assunto.toLowerCase(),
                }


                console.log(form);

                await http.post('/post', form)
                    .then(response => {
                        console.log('deu certo')
                        console.log(response);
                        console.log(response.data);
                    })

                await this.$nextTick();

                this.clearContent();
            } catch (error) {
                console.log(error)
                this.errorDialog = true;
            }
            // }

        },
        async clearContent() {
            this.quill.setText('');
            this.titulo = '';
            this.assunto = '';
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
}

.buttonPost {
    background-color:#835D3D;
    width: 150px;
    height: 30px;
}

.ql-font-roboto {
    font-family: 'Roboto', sans-serif;
}
</style>
