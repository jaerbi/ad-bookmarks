<template>
  <div>
    <v-layout row wrap>
      <v-container :class="localStoreColection.themeColor + '--text'"
        :style="{'fontSize': localStoreColection.fontSize}">
        <v-layout row class="mt-3">
          <v-flex xs2>
            <v-btn
              :class="localStoreColection.themeColor"
              dark
              @click.stop="drawer = !drawer"
            >
              <v-icon left>reorder</v-icon>
              Setting
            </v-btn>

            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
              dark
            >
              <v-list class="pa-1">
                <v-list-tile>
                  <h2>Setting</h2>
                </v-list-tile>
              </v-list>
              <v-list class="pt-1">
                <v-divider></v-divider>
                <v-list-tile
                  v-for="item in linksOne"
                  :key="item.title"
                  :to="{hash: item.url}"
                >
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-list class="ml-4">
                <h3 class="pb-3">Advanced</h3>
                <v-list-tile
                  v-for="item in linksTwo"
                  :key="item.title"
                  :to="item.url"
                >
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-navigation-drawer>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex 
            lg8 offset-lg2
            md10 offset-md1
            xs12>
          <!-- People -->
            <div class="mb-4">
              <h2 class="mb-3 ml-2">People</h2>
              <v-layout v-if="!loading && activeUserFilter.length === 0">
                <v-flex xs12>
                  <h2 class="ma-5 error--text">There is no active user</h2>
                </v-flex>
              </v-layout>
              <v-layout row elevation-10 v-else-if="!loading && 
                activeUserFilter.length !== 0">
                <v-flex xs12>
                  <v-card :class="localStoreColection.themeColor + '--text'" v-for="user in activeUserFilter" :key="user.name">
                    <v-layout row wrap align-center justify-center>
                      <v-flex xs4 offset-xs0 sm2>
                        <v-card-text>
                          <v-img :src="user.userAvatar" height="100" width="100"></v-img>
                        </v-card-text>
                      </v-flex>
                      <v-flex class="text-xs-center text-sm-left" xs12 sm6>
                        <v-card-text>
                          <h2>Name: <span class="indigo--text">{{user.name}}</span></h2>
                          <p>Email: <span class="info--text">{{user.email}}</span></p>
                        </v-card-text>
                      </v-flex>
                      <v-flex class="text-xs-center" xs12 sm2>
                        <v-card-actions>
                          <add-edit-user-modal :localStoreColection="localStoreColection" :users="user"></add-edit-user-modal>
                        </v-card-actions>
                      </v-flex>
                    </v-layout>
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
              <v-btn flat class="accent mt-3" exact to="/manegePeople">Manege other people</v-btn>
            </div>
          <!-- People_____END -->
          <!-- Appearence -->
            <div class="mb-4" id="appearance">
              <h2 class="mb-3 ml-2">Appearence</h2>
              <v-layout row elevation-10 class=" pa-4">
                <v-flex xs12>
                <!-- themes -->
                  <v-flex xs12>
                    <h3 class="pa-2">Themes</h3>
                    <v-radio-group 
                      @change="setActiveTheme()" 
                      v-model="localStoreColection.themeColor">
                      <v-layout wrap>
                        <v-radio
                          v-for="theme in themes"
                          :key="theme.name"
                          :label="theme.name"
                          :value="theme.value"
                          :color="localStoreColection.themeColor"
                        ></v-radio>
                      </v-layout>
                    </v-radio-group>
                    <v-divider></v-divider>
                  </v-flex>

                <!-- add_bookmark -->
                  <v-flex xs12>
                    <h3 class="pa-2">Add bookmark</h3>
                    <v-container grid-list-sm px-0>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <ul class="mb-3" v-for="item of bookmarks">
                            <li>Bookmark Title: <span class="indigo--text">{{ item.title }}</span></li>
                          </ul>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            name="title"
                            label="Bookmark Title *"
                            type="text"
                            :color="localStoreColection.themeColor"
                            :counter="2"
                            :rules="titleRules"
                            v-model="title"
                            required
                            outline
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            name="url"
                            label="Bookmark URL *"
                            type="text"
                            :color="localStoreColection.themeColor"
                            :rules="urlRules"
                            v-model="url"
                            required
                            outline
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-flex xs12 text-xs-right>
                      <v-btn 
                        class="success" 
                        @click="onSave"
                        :disabled="localLoading"
                        :loading="localLoading"
                      >
                        Add
                        <span slot="loader" class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </v-btn>
                    </v-flex>
                    <v-divider></v-divider>
                  </v-flex>

                <!-- Show bookmarks -->
                  <v-flex xs12>
                    <v-switch
                      label="Show bookmarks"
                      v-model="localStoreColection.showBookm"
                      @change="setActiveTheme()"
                      :color="localStoreColection.themeColor"
                    ></v-switch>
                    <v-divider></v-divider>
                  </v-flex>
                  
                <!-- Font size -->
                  <v-flex xs12>
                    <v-layout class="mt-2" row wrap align-center>
                      <v-flex xs12 sm6 >
                        <h3>Font size</h3>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          :items="fontSize"
                          item-value="value"
                          item-text="name"
                          @change="setActiveTheme()"
                          dense
                          label="Choose Font"
                          v-model="localStoreColection.fontSize"
                          :color="localStoreColection.themeColor"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                  </v-flex>

                <!-- Page zoom -->
                  <v-flex xs12>
                    <v-layout class="mt-2" row wrap align-center>
                      <v-flex xs12 sm6 >
                        <h3>Page zoom</h3>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          :items="selectPageZoom"
                          item-value="value"
                          item-text="name"
                          dense
                          @change="setActiveTheme()"
                          label="Select Zoom"
                          v-model="localStoreColection.pageZoom"
                          :color="localStoreColection.themeColor"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                  </v-flex>
                </v-flex>
              </v-layout>
            </div>
          <!-- Appearence______END -->

          <!-- Advanced -->
            <div class="mb-4" id="printing">
              <h2 class="mb-3 text-xs-center">Advanced</h2>
              <h3 class="pa-1 ml-1">Printing</h3>
              <v-layout row elevation-10>
                <v-flex xs12 class="ma-4">
                  <v-btn @click="printData" color="success" flat value="Print this page">
                    <v-icon left>print</v-icon>
                    Printers
                  </v-btn>
                </v-flex>
              </v-layout>
              <h3 class="pa-1 ml-1 mt-4">Reset</h3>
              <v-layout row elevation-10 id="reset">
                <v-flex xs12 class="ma-4">
                  <v-btn @click="resetSetings()" color="success" flat>
                    <v-icon left>settings_backup_restore</v-icon>
                    Reset
                  </v-btn>
                  <h4 class="font-weight-thin">Restore settings to their original defaults</h4>
                </v-flex>
              </v-layout>
            </div>
            
          <!-- Advanced_______END -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
const STORAGE_KEY = 'theme-option-page'
  export default {
    data () {
      return {
        title: '',
        url: 'https://',
        localLoading: false,
        drawer: null,
        titleRules: [
          v => !!v || 'Title is required',
          v => (v && v.length >= 2) || 'The Title must contain at least 2 characters'
        ],
        urlRules: [
          v => !!v || 'URL is required',
          v => /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+.(com|org|net|dk|at|us|tv|info|io|ru|re|ro|uk|ua|co.uk|biz|se)$)(:(\d+))?\/?/i.test(v) || 'URL must be valid'
        ],
        linksOne: [
          {title: 'People', icon: 'people', url: '#people'},
          {title: 'Appearance', icon: 'insert_chart_outlined', url: '#appearance'},
        ],
        linksTwo: [
          {title: 'Printing', icon: 'print', url: '#printing'},
          {title: 'Reset', icon: 'settings_backup_restore', url: '#reset'}
        ],
        themes: [
          {name: 'Blue', value: 'primary'},
          {name: 'Purple', value: 'info'},
          {name: 'Orange', value: 'warning'},
          {name: 'Brown', value: 'secondary'}
        ],
        fontSize: [
          {name: 'Small', value: '0.8em'},
          {name: 'Medium', value: '1em'},
          {name: 'Large', value: '1.5em'}
        ],
        selectPageZoom: [
          {name: '100%', value: 1},
          {name: '150%', value: 1.2},
          {name: '200%', value: 1.6}
        ],
        localStoreColection: {}
      }
    },
    created () {
      this.localStoreColection = JSON.parse(localStorage.getItem('theme-option-page'))
    },
    methods: {
      printData () {

        window.print()

      },
      setActiveTheme () {
        localStorage.setItem(STORAGE_KEY, 
          JSON.stringify(this.localStoreColection))
      },
      resetSetings () {
        this.localStoreColection = {
          themeColor: 'primary',
          showBookm: true,
          fontSize: '1em',
          pageZoom: 1
        }
        localStorage.setItem(STORAGE_KEY, 
          JSON.stringify(this.localStoreColection))
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
            this.url = ''
            this.localLoading = false
            this.modal = false
          })
        }
      }
    },
    computed: {
      bookmarks () {
        return this.$store.getters.bookmarks.reverse().slice(0,4)
      },
      users () {
        return this.$store.getters.users
      },
      activeUserFilter () {
        return this.$store.getters.activeUserFilter
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style>
  .v-navigation-drawer__border {
    display: none;
  }
</style>
