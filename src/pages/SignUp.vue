<template>
  <div>
    <h1
      :class="`font-weight-bold text-h4 text-center mb-5 ${getPreferences.secondaryColor}--text`"
    >
      Registrate
    </h1>
    <SignUp />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SignUp from '@/components/SignUp.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'

export default {
  name: 'PageSignUp',
  components: { SignUp },
  computed: {
    ...mapGetters(['getPreferences'])
  },
  created() {
    this.$emit('update:layout', LoginLayout)
  }
}
</script>
