import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store/'
import * as firebase from 'firebase'
import CreateBookmark from './components/CreateBookmark.vue'
import CreateUsers from './components/Setting/CreateUsers.vue'
import EditUserModal from './components/Setting/EditUser.vue'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.lightBlue.darken2, // #0288D1
    secondary: colors.brown.lighten1, // #8D6E63
    info: colors.purple.darken1, // #5E35B1
    warning: colors.deepOrange.lighten1, // #FF7043

    accent: colors.orange.lighten1, // #FFA726
    success: colors.green.accent4, // #00C853
    error: colors.red.accent4 // #D50000
  }
})

Vue.config.productionTip = false

Vue.component('add-new-bookmark', CreateBookmark)
Vue.component('add-new-users', CreateUsers)
Vue.component('add-edit-user-modal', EditUserModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDWJCfITxZb1gAnXW9xAmIqALfF3mz3sZM',
      authDomain: 'vutify-jaerbi.firebaseapp.com',
      databaseURL: 'https://vutify-jaerbi.firebaseio.com',
      projectId: 'vutify-jaerbi',
      storageBucket: 'vutify-jaerbi.appspot.com',
      messagingSenderId: '218269810367'
    })
    // this.$store.dispatch('loadBookmarks')
    this.$store.dispatch('listenToBookmarks')
    // this.$store.dispatch('loadUsers')
    this.$store.dispatch('listenToUsers')
  }
})
