<template>
  <v-dialog width="600px" persistent v-model="modal">
    <v-btn class="accent" dark flat slot="activator">Create Bookmark</v-btn>
    <v-card>
      <v-container :class="localStoreColection.themeColor + '--text'"
        :style="{'zoom': localStoreColection.pageZoom}">
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1>Create a new one Bookmark</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row elevation-10>
          <v-flex xs12>
            <v-form ref="form" v-model.lazy="valid" validation>
              <v-card-text>
                <v-text-field
                  name="title"
                  label="Bookmark Title *"
                  type="text"
                  :counter="2"
                  v-model="title"
                  :rules="titleRules"
                  :color="localStoreColection.themeColor"
                  required
                ></v-text-field>
                <v-text-field
                  name="url"
                  label="Bookmark URL *"
                  type="text"
                  v-model="url"
                  :rules="urlRules"
                  :color="localStoreColection.themeColor"
                ></v-text-field>
              </v-card-text>
            </v-form>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-end align-end>
          <v-flex xs12>
            <v-card-actions class="mt-3">
              <v-spacer></v-spacer>
              <v-btn 
              class="error mt-2" 
              flat @click="onCancel"
              :disabled="localLoading">Cancel</v-btn>
              <v-btn 
                class="success mt-2" 
                @click="onSave"
                :disabled="localLoading || !valid"
                :loading="localLoading"
              >
                Save
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
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
    props: ['localStoreColection'],
    data () {
      return {
        modal: false,
        valid: false,
        title: '',
        url: 'https://',
        titleRules: [
          v => !!v || 'Title is required',
          v => (v && v.length >= 2) || 'The Title must contain at least 2 characters'
        ],
        urlRules: [
          v => !!v || 'URL is required',
          v => /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+.(com|org|net|dk|at|us|tv|info|io|ru|re|ro|uk|ua|co.uk|biz|se)$)(:(\d+))?\/?/i.test(v) || 'URL must be valid'
        ],
        localLoading: false
      }
    },
    methods: {
      onCancel () {
        this.title = ''
        this.url = 'https://'
        this.modal = false
      },
      onSave () {
        if (this.title !== '' && this.url !== '') {
          this.localLoading = true
          this.$store.dispatch('createBookmark', {
            title: this.title,
            url: this.url
          })
          .finally(() => {
            this.title = ''
            this.url = 'https://'
            this.localLoading = false
            this.modal = false
          })
        }
      }
    }
  }
</script>