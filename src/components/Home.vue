<template>
  <v-container
    :style="{
      'zoom': localStoreColection.pageZoom, 
      'fontSize': localStoreColection.fontSize
    }"
    :class="localStoreColection.themeColor + '--text'">
    <v-layout row>
      <v-flex xs12 lg8 offset-lg2>
        <v-layout class="mt-3">
          <v-spacer></v-spacer>
          <v-flex xs12 sm8 md6>
            <v-text-field
              outline
              label="Введіть назву Bookmark"
              :color="localStoreColection.themeColor"
              v-model.lazy="serchName"
              append-icon="search"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <h1>Bookmark list</h1>
        <v-layout row wrap elevation-8 v-if="!loading && serchName.length !== 0">
          <v-flex xs12>
            <v-card 
              :class="localStoreColection.themeColor + '--text'" 
              v-for="bookmark in filteredBookmarks" 
              :key="bookmark.title">
              <v-card-actions>
                <v-layout wrap row align-center >
                  <v-flex xs12 sm6>
                    <v-card-text>
                      {{bookmark.title}}
                    </v-card-text>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-layout wrap>
                      <v-spacer></v-spacer>
                      <add-edit-modal :bookmarks="bookmark"></add-edit-modal>
                      <add-delete-modal :bookmarks="bookmark"></add-delete-modal>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-actions>
              <v-divider></v-divider>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!loading && filteredBookmarks.length === 0 && serchName !== ''">
          <v-flex xs12>
            <h2  class="ma-2 error--text">The Bookmark Name is not there - <span class="success--text display-1">{{ serchName }}</span></h2>
          </v-flex>
        </v-layout>
        <v-layout elevation-8 align-center justify-space-between row v-if="!loading && serchName === ''" v-show="localStoreColection.showBookm">
          <v-flex xs12>
            <v-card 
              :class="localStoreColection.themeColor + '--text'" 
              v-for="bookmark in paginatedData" 
              :key="bookmark.title">
              <v-card-actions>
                <v-layout wrap row align-center >
                  <v-flex xs12 sm6>
                    <v-card-text>
                      {{bookmark.title}}
                    </v-card-text>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-layout wrap>
                      <v-spacer></v-spacer>
                      <add-edit-modal :bookmarks="bookmark"></add-edit-modal>
                      <add-delete-modal :bookmarks="bookmark"></add-delete-modal>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-actions>
              <v-divider></v-divider>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-else>
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular
              :size="70"
              :width="7"
              :color="localStoreColection.themeColor"
              indeterminate
              v-if="loading"
              class="ma-5"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
        <add-new-bookmark :localStoreColection="localStoreColection" class="ma-2"></add-new-bookmark>
        <div class="text-xs-center">
          <v-pagination
            v-model="page"
            class="mb-4"
            :length="pageCount"
            :color="localStoreColection.themeColor"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditModal from './Edit.vue'
import DeleteModal from './Delete.vue'
  export default {
    data () {
      return {
        localStoreColection: {},
        serchName: '',
        page: 1,
        size: 8
      }
    },
    created () {
      this.localStoreColection = JSON.parse(localStorage.getItem('theme-option-page') || "{themeColor: 'primary',showBookm: true,fontSize: '1em',pageZoom: 1}")
    },
    computed: {
      filteredBookmarks () {
        return this.bookmarks.filter(bookmark => {
          return bookmark.title.toLowerCase().indexOf(this.serchName.toLowerCase()) !== -1
        })
      },
      pageCount () {
        let l = this.bookmarks.length,
            s = this.size;
        return Math.floor((l/s)+1);
      },
      paginatedData () {
        const start = (this.page - 1) * this.size,
              end = start + this.size;
         return this.bookmarks.slice(start, end);
      },
      bookmarks () {
        return this.$store.getters.bookmarks
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    components: {
      addEditModal: EditModal,
      addDeleteModal: DeleteModal
    }
  }
</script>

<style>
  
</style>
