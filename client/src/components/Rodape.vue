<template>
    <v-footer border class="bg-indigo-lighten-1 text-center d-flex flex-column">
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

            <v-btn class="mx-4" to="/quemsou" variant="outlined">
                Quem sou eu?
            </v-btn>
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
</style>