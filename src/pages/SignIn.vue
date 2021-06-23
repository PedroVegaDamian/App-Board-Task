<template>
  <div>
    <h1
      :class="`font-weight-bold text-h4 text-center mb-5 ${getPreferences.primaryColor}--text`"
    >
      Iniciar Sesión
    </h1>
    <SignIn />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SignIn from '@/components/SignIn.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'

export default {
  name: 'PageSignIn',
  components: { SignIn },
  computed: {
    ...mapGetters(['getPreferences'])
  },
  created() {
    this.$emit('update:layout', LoginLayout)
  }
}
</script>
