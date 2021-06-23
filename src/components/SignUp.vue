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
        :color="getPreferences.secondaryColor"
        v-model="email"
        :rules="emailRules"
        label="Correo electrónico"
      ></v-text-field>
      <v-text-field
        dense
        outlined
        :color="getPreferences.secondaryColor"
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
        :color="getPreferences.secondaryColor"
        :dark="!loading"
        :loading="loading"
        :disabled="loading"
        >Registrarse
        <template v-slot:loader>
          <span>Cargando...</span>
        </template>
      </v-btn>
    </v-form>
    <div class="text-center">
      <p class="text--secondary">
        Inicia sesión si tienes una cuenta activa
        <router-link
          :class="`${getPreferences.primaryColor}--text`"
          :to="{ name: 'SignIn' }"
          >Aquí</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SignUp',
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
      passwordRules: [
        value => !!value || 'El campo contraseña es requirido',
        value =>
          value.length >= 6 ||
          'La contraseña debe de tener al menos 6 caractéres'
      ]
    }
  },
  computed: {
    ...mapGetters(['getPreferences'])
  },
  methods: {
    ...mapActions(['signUp']),
    async validate() {
      await this.$refs.form.validate()
      if (this.valid) {
        this.authSignUp()
      }
    },
    async authSignUp() {
      this.loading = true
      const user = await this.signUp({
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
