<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout"></router-view>
    </component>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    layout: 'div'
  }),
  methods: {
    ...mapMutations({ changeTheme: 'SET_THEME' })
  },
  created() {
    if (localStorage.getItem('preferences') === null) return

    const preferences = JSON.parse(localStorage.getItem('preferences'))

    if (
      Object.keys(preferences).every(
        preference =>
          preference === 'primaryColor' || preference === 'secondaryColor'
      )
    ) {
      this.changeTheme(preferences)
    }
  }
}
</script>
