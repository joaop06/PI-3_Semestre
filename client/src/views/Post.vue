<template>
    <div class="bg-primary h-100"><br>
        <div class="mx-15 bg-warning h-100">
            <h1>data:</h1><br>
            <h2 class="d-flex justify-center">titulo</h2>
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