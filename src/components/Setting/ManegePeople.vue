<template>
  <v-container :style="{'fontSize': localStoreColection.fontSize}"
    :class="localStoreColection.themeColor + '--text'">
    <v-layout row>
      <v-flex xs12>
        <h1 class="pa-2 mb-3">Users list</h1>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
              v-if="loading"
              class="ma-5"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
        <v-layout row align-center justify-center elevation-5 v-if="!loading">
          <v-flex xs12>
            <v-card :class="localStoreColection.themeColor + '--text'" v-for="user in paginatedData" :key="users.name">
              <v-layout row wrap align-center justify-center>
                <v-flex xs12 md2 sm3>
                  <v-card-text >
                    <v-img :src="user.userAvatar" height="100" width="100"></v-img>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 md6 sm6>
                  <v-card-text>
                    <h2>Name: <span class="indigo--text">{{user.name}}</span></h2>
                    <p>Email: <span class="info--text">{{user.email}}</span></p>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 md2 sm4>
                  <v-card-actions>
                    <add-edit-user-modal :localStoreColection="localStoreColection" :users="user"></add-edit-user-modal>
                    <add-delete-user-modal :users="user"></add-delete-user-modal>
                  </v-card-actions>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </v-card>
          </v-flex>
        </v-layout>
        <add-new-users :localStoreColection="localStoreColection" class="pt-3 ma-2"></add-new-users>
        <div  class="mb-3 text-xs-center">
          <v-pagination
            v-model="page"
            :color="localStoreColection.themeColor"
            :length="pageCount"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DeleteUserModal from './DeleteUser.vue'
  export default {
    data () {
      return {
        localStoreColection: {},
        page: 1,
        size: 8
      }
    },
    computed: {
      pageCount () {
        let l = this.users.length,
            s = this.size;
        return Math.floor((l/s)+1);
      },
      paginatedData () {
        const start = (this.page - 1) * this.size,
              end = start + this.size;
         return this.users.slice(start, end);
      },
      users () {
        return this.$store.getters.users
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    components: {
      addDeleteUserModal: DeleteUserModal
    },
    created () {
      this.localStoreColection = JSON.parse(localStorage.getItem('theme-option-page') || "{themeColor: 'primary',showBookm: true,fontSize: '1em',pageZoom: 1}")
    }
  }
</script>
