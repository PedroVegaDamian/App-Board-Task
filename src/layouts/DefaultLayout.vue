<template>
  <div>
    <v-app-bar :color="getPreferences.primaryColor">
      <router-link class="text-decoration-none" :to="{ name: 'Home' }">
        <div class="text-h5 white--text">Board Task</div>
      </router-link>
      <v-spacer />

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link :to="{ name: 'Themes' }">
            <v-list-item-title>
              <v-icon>mdi-palette</v-icon>
              Temas</v-list-item-title
            >
          </v-list-item>
          <v-list-item link>
            <v-list-item-title @click="logout">
              <v-icon>mdi-logout</v-icon>
              Cerrar Sesión</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <slot />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters(['getPreferences'])
  },
  methods: {
    ...mapActions([
      'signOut',
      'setCurrentUser',
      'getBoards',
      'getLists',
      'getTasks'
    ]),
    logout() {
      this.signOut()
    }
  },
  created() {
    this.setCurrentUser()
    this.getBoards()
    this.getLists()
    this.getTasks()
  }
}
</script>
