<template>
  <div class="px-4 mt-7">
    <v-text-field
      dense
      outlined
      v-model="title"
      @keypress.enter="createTask"
      label="Crea una nueva tarea"
    />
  </div>
</template>

<script>
import { firestoreCreateTask } from '@/services/firestore'

export default {
  name: 'CreateTask',
  props: {
    idList: {
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
    async createTask() {
      await firestoreCreateTask(this.title, this.idList)
      this.title = ''
    }
  }
}
</script>
