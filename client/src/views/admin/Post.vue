<template>
    <div class=" h-100"><br>
        <div class="mx-15 h-100">
            <QuillEditor></QuillEditor>
        </div>
        <!-- estilizar o post agora, fazer a lógica da rota para os botões e também para mostrar o conteudo -->
        <!-- conteudo necessário: titulo, data de publicação, conteudo e, se possível, assunto -->
    </div>
</template>
<script>
import QuillEditor from '@/components/QuillPost.vue'


export default {
    components: {
        QuillEditor
    },
}
</script>
<style lang="">
    
</style>