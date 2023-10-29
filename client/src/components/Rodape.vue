<template>
    <v-footer border class="rodape text-center d-flex flex-column">
        <div>
            <a class="link" href="mailto:lilicaindica@gmail.com" target="_blank">
                <v-icon class="mx-10" icon="mdi-email"></v-icon>
            </a>

            <a class="link" href="https://www.facebook.com/lilicaindica" target="_blank">
                <v-icon class="mx-10" icon="mdi-facebook"></v-icon>
            </a>

            <a class="link" href="https://twitter.com/lilicaindica" target="_blank">
                <v-icon class="mx-10" icon="mdi-twitter"></v-icon>
            </a>

            <a class="link" href="https://www.instagram.com/lilicaindica" target="_blank">
                <v-icon class="mx-10" icon="mdi-instagram"></v-icon>
            </a>

            <v-btn class="mx-4" variant="outlined">
                Quem sou eu?
            </v-btn>
            <!-- to="/quemsou" -->
        </div>

    </v-footer>
</template>
<script>
export default {
    data: () => ({
    }),
}
</script>

<style>
.link{
    text-decoration: none;
    color: black;
}
.rodape{
    background-color: #F7CFCD !important;
}
</style>