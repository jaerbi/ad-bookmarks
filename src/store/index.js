import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared
  },
  state: {
    bookmarks: [],
    users: [],
    avatars: [
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_boy.png?alt=media&token=ceee0764-d26d-4dac-b7b1-2142f666bce9', name: 'avatar_boy'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_girl.png?alt=media&token=6141b3ae-28ec-4e39-8ea2-027cf58ea97e', name: 'avatar_girl'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_man.png?alt=media&token=da5129a7-b90a-4798-aad5-074615ca9f46', name: 'avatar_man'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_man_2.png?alt=media&token=87cf09b9-d407-4ef9-9213-443eaa5ddcf1', name: 'avatar_man_2'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_man_3.png?alt=media&token=8c18c3ce-6ca2-4c79-a719-156be0036d37', name: 'avatar_man_3'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_old_man.png?alt=media&token=37b46c6e-b9ec-4b81-aa7f-6e96bf98f77f', name: 'avatar_old_man'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_old_wommen.png?alt=media&token=44ec6129-168c-4fa3-97a2-10e2631b5716', name: 'avatar_old_wommen'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_support_man.png?alt=media&token=31e3419f-aada-4f2a-a369-968831764b07', name: 'avatar_support_man'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_support_wommen.png?alt=media&token=415ec9f1-3b90-44c5-8654-505e81193609', name: 'avatar_support_wommen'},
      {urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/vutify-jaerbi.appspot.com/o/avatar%2Favatar_wommen.png?alt=media&token=3529d96a-b741-4dd6-b38c-dab9422b704c', name: 'avatar_wommen'}
    ],
  },
  mutations: {
    // createBookmark (state, payload) {
    //   state.bookmarks.push(payload)
    // },
    // createUser (state, payload) {
    //   state.users.push(payload)
    // },
    updateBookmark (state, payload) {
      const bookmark = state.bookmarks.find(bookmark => {
        bookmark.id === payload.id
      })
      if (payload.title) {
        bookmark.title = payload.title
      }
      if (payload.url) {
        bookmark.url = payload.url
      }
    },
    updateUser (state, payload) {
      const user = state.users.find(user => {
        user.id === payload.id
      })
      if (payload.name) {
        user.name = payload.name
      }
      if (payload.email) {
        user.email = payload.email
      }
      if (payload.userAvatar) {
        user.userAvatar = payload.userAvatar
      }
      if (payload) {
        user.activUser = payload.activUser
      }
    },
    setLoadedBookmarks (state, payload) {
      state.bookmarks = payload
    },
    setLoadedUsers (state, payload) {
      state.users = payload
    }
  },
  actions: {
// BOOKMARKS____________________________________________
    listenToBookmarks ({ commit }) {
      commit('setLoading', true)
      var onceBookmarkFireBase = firebase.database().ref('list-Bookmarks')
      onceBookmarkFireBase.on('value', function(data) {
        const bookmarks = []
        const obj = data.val()
        for (let key in obj) {
            bookmarks.push({
              id: key,
              title: obj[key].title,
              url: obj[key].url
            })
          }
        commit('setLoadedBookmarks', bookmarks)
        commit('setLoading', false)
      })   
    },
    // loadBookmarks ({commit}) {
    //   commit('setLoading', true)
    //   firebase.database().ref('list-Bookmarks').once('value')
    //     .then((data) => {
    //       const bookmarks = []
    //       const obj = data.val()
    //       for (let key in obj) {
    //         bookmarks.push({
    //           id: key,
    //           title: obj[key].title,
    //           url: obj[key].url
    //         })
    //       }
    //       commit('setLoadedBookmarks', bookmarks)
    //       commit('setLoading', false)
    //     })
    //     .catch(
    //       (error) => {
    //         console.log(error)
    //         commit('setLoading', false)
    //       }
    //     )
    // },
    createBookmark ({commit}, payload) {
      const bookmarkList = {
        title: payload.title,
        url: payload.url
      }
      
      firebase.database().ref('list-Bookmarks').push(bookmarkList)
        .then((data) => {
          const key = data.key
          // commit('createBookmark', {
          //   ...bookmarkList,
          //   id: key
          // })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateBookmarkData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.url) {
        updateObj.url = payload.url
      }
      firebase.database().ref('list-Bookmarks').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateBookmark', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    async onDeleteBookmark ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('list-Bookmarks').child(payload.id).remove()
        console.log('done, this - '+ payload.id + ' - delete')
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        throw error
      }
    },
// USERS____________________________________________
    createUser ({commit}, payload) {
      const userList = {
        name: payload.name,
        email: payload.email,
        userAvatar: payload.userAvatar,
        activUser: payload.activUser
      }

      firebase.database().ref('list-Users').push(userList)
        .then((data) => {
          const key = data.key
          // commit('createUser', {
          //   ...userList,
          //   id: key
          // })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    listenToUsers ({ commit }) {
      commit('setLoading', true)
      var onceUsersFireBase = firebase.database().ref('list-Users')
      onceUsersFireBase.on('value', function(data) {
        const users = []
        const obj = data.val()
        for (let key in obj) {
            users.push({
              id: key,
              email: obj[key].email,
              name: obj[key].name,
              userAvatar: obj[key].userAvatar,
              activUser: obj[key].activUser
            })
          }
        commit('setLoadedUsers', users)
        commit('setLoading', false)
      })   
    },
    // loadUsers ({commit}) {
    //   commit('setLoading', true)
    //   firebase.database().ref('list-Users').once('value')
    //     .then((data) => {
    //       const users = []
    //       const obj = data.val()
    //       for (let key in obj) {
    //         users.push({
    //           id: key,
    //           email: obj[key].email,
    //           name: obj[key].name,
    //           userAvatar: obj[key].userAvatar,
    //           activUser: obj[key].activUser
    //         })
    //       }
    //       commit('setLoadedUsers', users)
    //       commit('setLoading', false)
    //     })
    //     .catch(
    //       (error) => {
    //         console.log(error)
    //         commit('setLoading', false)
    //       }
    //     )
    // },
    updateUserData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.name) {
        updateObj.name = payload.name
      }
      if (payload.email) {
        updateObj.email = payload.email
      }
      if (payload.userAvatar) {
        updateObj.userAvatar = payload.userAvatar
      }
      if (payload) {
        updateObj.activUser = payload.activUser
      }
      firebase.database().ref('list-Users').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateUser', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    async onDeleteUser ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('list-Users').child(payload.id).remove()
        console.log('done, this - '+ payload.id + ' - delete')
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    bookmarks (state) {
      return state.bookmarks
    },
    users (state) {
      return state.users
    },
    avatars (state) {
      return state.avatars
    },
    activeUserFilter (state) {
      var res = state.users.filter(function (x) {
        return x.activUser
      })
      return res
    }
  }
})
