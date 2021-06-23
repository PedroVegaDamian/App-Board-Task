<template>
  <div class="mt-5">
    <v-text-field
      dense
      outlined
      v-model="title"
      @keypress.enter="createList"
      label="Título para una lista"
    />
  </div>
</template>

<script>
import { firestoreCreateList } from '@/services/firestore'

export default {
  name: 'CreateList',
  props: {
    idBoard: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: ''
    }
  },
  methods: {
    async createList() {
      await firestoreCreateList(this.title, this.idBoard)
      this.title = ''
    }
  }
}
</script>
