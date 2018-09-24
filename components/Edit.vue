<template>
  <v-dialog width=350px persistent v-model="editDialog">
    <v-btn class="success" slot="activator">
      edit
      <v-icon right>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title class="primary--text headline font-weight-black">Edit</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row class="elevation-5">
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title bookmark*"
                v-model="editedTitle"
                required
              ></v-text-field>
              <v-text-field
                name="url"
                label="Url bookmark *"
                v-model="editedUrl"
                required
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions class="mt-2">
              <v-spacer></v-spacer>
              <v-btn
                color="error darken-1"
                flat
                outline
                @click="editDialog = false"
              >
                Cancell
              </v-btn>
              <v-btn
                color="success darken-1"
                @click="onSaveChanges"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['bookmarks'],
    data () {
      return {
        editDialog: false,
        editedUrl: this.bookmarks.url,
        editedTitle: this.bookmarks.title
       }
    },
    methods: {
      onSaveChanges () {
        if (this.editedUrl.trim() === '' || this.editedTitle.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateBookmarkData', {
          id: this.bookmarks.id,
          title: this.editedTitle,
          url: this.editedUrl
        })
      }
    }
  }
</script>