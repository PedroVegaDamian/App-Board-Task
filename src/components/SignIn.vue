<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="validate"
    >
      <v-text-field
        dense
        outlined
        :color="getPreferences.primaryColor"
        v-model="email"
        :rules="emailRules"
        label="Correo electrónico"
      ></v-text-field>
      <v-text-field
        dense
        outlined
        :color="getPreferences.primaryColor"
        label="Contraseña"
        v-model="password"
        @click:append="showEye = !showEye"
        :type="showEye ? 'text' : 'password'"
        :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
      ></v-text-field>
      <v-btn
        block
        class="mb-3"
        type="submit"
        :color="getPreferences.primaryColor"
        :dark="!loading"
        :loading="loading"
        :disabled="loading"
        >Iniciar Sesión
        <template v-slot:loader>
          <span>Cargando...</span>
        </template>
      </v-btn>
    </v-form>
    <div class="text-center">
      <p class="text--secondary">
        Si no tienes una cuenta registrate
        <router-link
          :to="{ name: 'SignUp' }"
          :class="`${getPreferences.secondaryColor}--text`"
          >Aquí</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      showEye: false,
      loading: false,
      emailRules: [
        value => !!value || 'El campo correo electrónico es requerido',
        value =>
          /.+@.+\..+/.test(value) || 'El correo electrónico debe ser válido'
      ],
      passwordRules: [value => !!value || 'El campo contraseña es requirido']
    }
  },
  computed: {
    ...mapGetters(['getPreferences'])
  },
  methods: {
    ...mapActions(['signIn']),
    async validate() {
      await this.$refs.form.validate()
      if (this.valid) {
        this.authSignIn()
      }
    },
    async authSignIn() {
      this.loading = true
      const user = await this.signIn({
        email: this.email,
        password: this.password
      })

      if (!user) {
        this.loading = false
        this.email = ''
        this.password = ''
      }
    }
  }
}
</script>
