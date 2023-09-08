<template>
    <div class="teste" v-if="editor">
        <!-- cor -->
        <input class="inputCor" type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
            :value="editor.getAttributes('textStyle').color">
        <!-- fontes -->
        <button class="botao bg-primary" @click.prevent="setFontFamily('Inter')"
            :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'Inter' }) }">
            Inter
        </button>
        <button class="botao bg-primary" @click.prevent="setFontFamily('Comic Sans MS, Comic Sans')"
            :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) }">
            Comic Sans
        </button>
        <button class="botao bg-primary" @click.prevent="setFontFamily('serif')"
            :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'serif' }) }">
            serif
        </button>
        <button class="botao bg-primary" @click.prevent="setFontFamily('monospace')"
            :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'monospace' }) }">
            monospace
        </button>
        <button class="botao bg-primary" @click.prevent="setFontFamily('cursive')"
            :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'cursive' }) }">
            cursive
        </button>

        <!-- alinhamento -->
        <button class="botao" @click.prevent="setTextAlign('left')"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
            left
        </button>
        <button class="botao" @click.prevent="setTextAlign('center')"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
            center
        </button>
        <button class="botao" @click.prevent="setTextAlign('right')"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
            right
        </button>
        <button class="botao" @click.prevent="setTextAlign('justify')"
            :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
            justify
        </button>
        <button class="botao" @click.prevent="editor.chain().focus().unsetTextAlign().run()">
            unsetTextAlign
        </button>

        <!-- imagem -->
        <input type="file" @change="handleFileUpload" accept="image/*" />
        <button @click.prevent="insertImage">Inserir Imagem</button>

        <editor-content :editor="editor" />
    </div>
</template>
  
<script>
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import FontFamily from '@tiptap/extension-font-family'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'

import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
    components: {
        EditorContent,
    },

    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },

    emits: ['update:modelValue'],

    data() {
        return {
            editor: null,
        }
    },

    watch: {
        modelValue(value) {
            // HTML
            const isSame = this.editor.getHTML() === value

            // JSON
            // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

            if (isSame) {
                return
            }

            this.editor.commands.setContent(value, false)
        },
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Color,
                TextStyle,
                FontFamily,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Image.configure({
                    inline: true,
                    allowBase64: true,
                })
            ],
            content: this.modelValue,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML())

                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            },
        })
        console.log(this.editor)
    },

    beforeUnmount() {
        this.editor.destroy()
    },

    methods: {
        handleFileUpload(event) {
            this.selectedImage = event.target.files[0]
        },
        insertImage() {
            if (this.selectedImage) {
                const reader = new FileReader()
                reader.onload = () => {
                    this.editor.chain().focus().setImage(reader.result).run()
                }
                reader.readAsDataURL(this.selectedImage)
            }
        },
        setFontFamily(fontFamily) {
            this.editor.chain().focus().setFontFamily(fontFamily).run();
        },
        setTextAlign(alignText) {
            try {
                this.editor.chain().focus().setTextAlign(alignText).run();
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>

<style>
.botao {
    margin: 3px;
    border-radius: 8px;
    width: 100px;
}

.inputCor {
    border-radius: 30px;
}

.tiptap {
    min-height: 410px;
    max-height: 70px;
    width: auto;
    background-color: red;
    overflow-y: scroll;
    scrollbar-width: thin;
    /* Esconde a barra de rolagem nativa no Firefox */
    scrollbar-color: transparent transparent;
}

.tiptap::-webkit-scrollbar {
    width: 6px;
    /* Largura da barra de rolagem */
}

.tiptap:-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Cor da alça da barra de rolagem */
}
</style>