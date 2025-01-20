<script>
  export default {
    data: () => ({
      drawer: true, // 初期値を false に設定
      links: [
        { icon: 'mdi-inbox-arrow-down', text: 'Inbox', to: '/inbox' },
        { icon: 'mdi-send', text: 'Send', to: '/send' },
        { icon: 'mdi-delete', text: 'Trash', to: '/trash' },
        { icon: 'mdi-alert-octagon', text: 'Spam', to: '/spam' },
      ],
    }),
  };
</script>

<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->

    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <v-sheet class="pa-4" color="grey-lighten-4">
          <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
          <div>john@google.com</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.icon"
            :to="link.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>