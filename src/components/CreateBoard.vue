<template>
  <div class="mt-5">
    <v-text-field
      dense
      outlined
      v-model="title"
      @keypress.enter="createBoard"
      label="Título para un tablero"
    />
  </div>
</template>

<script>
import { firestoreCreateBoard } from '@/services/firestore'

export default {
  name: 'CreateBoard',
  data() {
    return {
      title: ''
    }
  },
  methods: {
    async createBoard() {
      await firestoreCreateBoard(this.title)
      this.title = ''
    }
  }
}
</script>
