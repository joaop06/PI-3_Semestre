<template>
    <v-card
      class="mx-auto"
      color="#26c6da"
      theme="dark"
      max-width="400"
      prepend-icon="mdi-twitter"
      title="Twitter"
    >
      <template v-slot:prepend>
        <v-icon size="x-large"></v-icon>
      </template>
  
      <v-card-text class="text-truncate text-h5 py-2">
        {{post.descricao}}
      </v-card-text>
  
      <v-card-actions>
        <v-list-item class="w-100">
  
          <template v-slot:append>
            <div class="justify-self-end">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">256</span>
              <span class="me-1">·</span>
              <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
              <span class="subheading">45</span>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </template>