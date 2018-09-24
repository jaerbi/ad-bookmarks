<template>
  <v-app>

    <v-navigation-drawer 
      app 
      temporary
      v-model="drawer">
      <v-list>
        <v-list-tile
          v-for="link of links"
          :key="link.title"
          exact
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark :color="localStoreColection.themeColor">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          tag="span"
          to="/"
          style="cursor: pointer;"
        >
          Bookmark
          <v-icon class="ml-4" right>bookmarks</v-icon>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat
          v-for="link in links"
          :key="link.title"
          :to="link.url">
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      localStoreColection: [],
      locStart: {themeColor: 'primary',showBookm: true,fontSize: '1em',pageZoom: 1},
      drawer: false,
      links: [
        {title: 'Settings', icon: 'settings', url: '/settings'},
      ]
    }
  },
  created () {
    const STORAGE_KEY = 'theme-option-page'
    if (localStorage.getItem(STORAGE_KEY)) {

      this.localStoreColection = JSON.parse(localStorage.getItem(STORAGE_KEY))

    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.locStart))
      this.localStoreColection = JSON.parse(localStorage.getItem(STORAGE_KEY))
    }
  }
}
</script>

<style>
  body {
    font-size: 18px;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
