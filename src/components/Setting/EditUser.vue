<template>
  <v-dialog fullscreen hide-overlay v-model="editModal">
    <v-btn class="success" dark flat slot="activator">Edit</v-btn>
    <v-card dark>
      <v-container :style="{'zoom': localStoreColection.pageZoom, 
        'fontSize': localStoreColection.fontSize}">
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="success--text">Edit User</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row elevation-10>
          <v-flex xs12>
            <v-card-text>
              <v-form ref="form" v-model.lazy="valid" validation>
                <h3 class="success--text ml-4"> Name</h3>
                <v-text-field
                  prepend-icon="person"
                  name="name"
                  label="User Name *"
                  type="text"
                  :counter="4"
                  v-model="editedName"
                  :rules="nameRules"
                ></v-text-field>
                <h3 class="success--text ml-4">Change User email address</h3>
                <v-text-field 
                  prepend-icon="alternate_email" 
                  name="email" 
                  label="Email" 
                  type="email"
                  v-model="editedEmail"
                  :rules="emailRules"
                ></v-text-field>
                <h3 class="success--text ml-4">Change User Activ</h3>
                <v-checkbox
                  class="ml-5"
                  color="success"
                  :label="`Checkbox 1: ${editedMarkUser.toString()}`"
                  v-model="editedMarkUser"
                ></v-checkbox>
                <v-divider></v-divider>
                <v-layout>
                  <v-flex xs12>
                    <h3 class="success--text mt-2 ml-4">Change User Avatar</h3>
                    <ul class="list_avatar">
                      <li class="ma-3" v-for="avatar in avatars" :key="avatar.name">
                        <label class="radio">
                          <input 
                            type="radio" 
                            :name="avatar.name" 
                            class="color_cheked" 
                            v-model="editedUserAvatar" 
                            :value="avatar.urlAvatar">
                            <div class="colorId" style="background: white"></div>
                          <v-img height="100" width="100" :src="avatar.urlAvatar"></v-img>
                        </label>
                      </li>
                    </ul>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions class="mt-3">
              <v-spacer></v-spacer>
              <v-btn 
                class="error" 
                flat @click="editModal = false"
              >Cancel</v-btn>
              <v-btn 
                class="success" 
                @click="onSaveChanges"
                :disabled="!valid"
              >Save
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
    props: ['users', 'localStoreColection'],
    data () {
      return {
        editModal: false,
        valid: false,
        editedName: this.users.name,
        editedEmail: this.users.email,
        editedUserAvatar: this.users.userAvatar,
        editedMarkUser: this.users.activUser,
        emailRules: [
          v => !!v || 'Електронна пошта обов\'язкова',
          v => /.+@.+/.test(v) || 'Електронна пошта повинна бути дійсною'
        ],
        nameRules: [
          v => !!v || 'Name обов\'язковe',
          v => (v && v.length >= 4) || 'Name має містити не менше 6 символів'
        ]
      }
    },
    methods: {
      onSaveChanges () {
        console.log(this.editedMarkUser)
        if (this.editedName.trim() === '' || this.editedEmail.trim() === '') {
          return
        }
        this.editModal = false
        this.$store.dispatch('updateUserData', {
          id: this.users.id,
          name: this.editedName,
          email: this.editedEmail,
          userAvatar: this.editedUserAvatar,
          activUser: this.editedMarkUser
        })
      }
    },
    computed: {
      avatars () {
        return this.$store.getters.avatars
      }
    }
  }
</script>

<style>
  .list_avatar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .list_avatar li {
    list-style: none;
  }
  .color_cheked {
    position: absolute;
    z-index: -1;
    opacity: 0;
    margin: 10px 0 0 7px;
  }
  .colorId {
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,.4);
  }
  .colorId:before {
    content: '';
    position: absolute;
    top:-1px;left:-1px;
    width: 22px;
    height: 22px;
    border: 1px solid transparent;
    border-radius: 50%;
  }
  .colorId:after {
    content: '';
    position: absolute;
    top:11px;left:11px;
    width: 10px;
    height: 10px;
    border: 3px solid transparent;
    border-radius:20%;
    border-bottom: 8px solid rgba(0,173,20,0.86);
    border-right: 8px solid rgba(0,173,20,0.86);
    opacity: 0;
    transition: .1s;
  }
  .radio input:checked + .colorId:after {
    opacity: 1;
  }
  .radio input:focus + .colorId:before {
    box-shadow: 1px 1px 4px 4px rgba(0,173,20,0.76);
  }
</style>

