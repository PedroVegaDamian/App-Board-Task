<template>
  <v-col cols="12" sm="6" md="4" lg="3" xl="2">
    <v-card dark :color="getPreferences.secondaryColor">
      <router-link
        class="text-decoration-none"
        :to="{ name: 'Board', params: { id: board.id } }"
      >
        <v-card-title class="white--text justify-space-between">
          {{ board.title }}

          <v-btn icon color="red" @click="deleteBoard">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
      </router-link>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import { firestoreDeleteBoard } from '@/services/firestore'

export default {
  name: 'CardBoard',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getPreferences'])
  },
  methods: {
    deleteBoard() {
      firestoreDeleteBoard(this.board.id)
    }
  }
}
</script>
