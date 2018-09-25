<template>
  <v-dialog width="360px" persistent v-model="deliteModal">
    <v-btn class="ml-1 error" flat slot="activator" >
      Delete
    </v-btn>
    <v-card>
      <v-card-title
        class="headline error--text lighten-2"
      >
        Delete User
      </v-card-title>

      <v-card-text>
        <h2>User <span class="primary--text"> - {{users.name}} -</span> will be deleted from the site and can not be restored !!!</h2>
        <br>
        <h3 class="error--text">Are you sure you want to do this?</h3>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="whiteB">
        <v-spacer></v-spacer>
        <v-btn
          class="error--text"
          outline
          @click="deliteModal = false"
        >Cancel</v-btn>
        <v-btn
          class="success"
          @click="onDeleteBookmark"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['users'],
  data () {
    return {
      deliteModal: false
    }
  },
  methods: {
    onDeleteBookmark () {
      this.$store.dispatch('onDeleteUser', {
        id: this.users.id
      })
      this.deliteModal = false
    }
  }
}
</script>