<template>
  <div>
    <v-radio-group v-model="themeSelected" column>
      <v-radio
        label="Azul y Dark"
        color="primary"
        value="primary,secondary"
      ></v-radio>
      <v-radio
        label="Morado y Naranja"
        color="purple"
        value="purple,orange"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default {
  name: 'PageThemes',
  data() {
    return {
      themeSelected: 'primary,secondary'
    }
  },
  watch: {
    themeSelected() {
      const themeArray = this.themeSelected.split(',')
      const theme = {
        primaryColor: themeArray[0],
        secondaryColor: themeArray[1]
      }
      this.changeTheme(theme)
      localStorage.setItem('preferences', JSON.stringify(theme))
    }
  },
  computed: {
    ...mapGetters(['getPreferences'])
  },
  methods: {
    ...mapMutations({ changeTheme: 'SET_THEME' })
  },
  created() {
    this.themeSelected = `${this.getPreferences.primaryColor},${this.getPreferences.secondaryColor}`
    this.$emit('update:layout', DefaultLayout)
  }
}
</script>
