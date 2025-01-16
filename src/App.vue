<template>
  <v-app>
    <v-main>
      <!-- <HelloWorld/> -->
      <ChatComponent/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ChatComponent from './components/ChatComponent'

export default {
  name: 'App',

  components: {
    // HelloWorld,
    ChatComponent,
  },

  data: () => ({
    //
  }),
}
</script>
