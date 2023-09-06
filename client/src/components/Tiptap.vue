<template>
    <div v-if="editor">
        //cor
        <input type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
            :value="editor.getAttributes('textStyle').color">
        //fontes
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
        <button  class="botao bg-primary" @click.prevent="setFontFamily('monospace')"
            :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'monospace' }) }">
            monospace
        </button>
        <button class="botao bg-primary" @click.prevent="setFontFamily('cursive')"
            :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'cursive' }) }">
            cursive
        </button>

        //alinhamento
        <button @click.prevent="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        left
          </button>
          <button @click.prevent="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
            center
          </button>
          <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
            right
          </button>
          <button @click.prevent="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
            justify
          </button>
          <button @click.prevent="editor.chain().focus().unsetTextAlign().run()">
            unsetTextAlign
          </button>
        <editor-content :editor="editor" />
    </div>
</template>
  
<script>
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import FontFamily from '@tiptap/extension-font-family'
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
                FontFamily
            ],
            content: this.modelValue,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML())

                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            },
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },

    methods: {
        setFontFamily(fontFamily) {
            this.editor.chain().focus().setFontFamily(fontFamily).run();
        },
    },
}
</script>

<style>
.botao{
    margin: 3px;
    border-radius: 8px;
    width: 100px;
}
</style>