<template>
  <v-app id="inspire">
    <v-app-bar class="top-bar">
      <v-app-bar-title>Freiends</v-app-bar-title>
      <!-- <v-spacer></v-spacer> -->
      <v-btn icon="mdi-dots-vertical">
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="n in 12"
            :key="n"
            cols="4"
          >
            <!-- <v-card height="200"></v-card> -->
						<router-link :to="{ path: '/chat', query: { user_id: n }}">
							<v-avatar class="mb-4" color="grey-lighten-2" size="80"></v-avatar>
						</router-link>
            <div>jack@google.com</div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.topbar {
  margin-bottom: 10px;
}
</style>