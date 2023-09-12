<template>
    <div class="body">
        <br>
        <div class="bg-warning ma-6 h-100">
            <br>
            <v-card v-for="(post) in posts" :key="post.id" class="ma-6" title="Card title" text="..." variant="outlined">
                <v-card-actions>
                    <v-btn>Click me</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
<script>
import bd from '@/tests/banco.json';

export default {
    data() {
    return {
      posts: bd
    };
  },
}
</script>
<style>
.body {
    background-color: blue !important;
    width: 100%;
    height: 100%;
}
</style>