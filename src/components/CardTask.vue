<template>
  <v-col cols="12" class="py-2">
    <v-card dark :color="getPreferences.secondaryColor">
      <v-card-title class="justify-space-between">
        {{ task.title }}

        <div>
          <v-btn icon color="red" @click="deleteTask">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import { firestoreDeleteTask } from '@/services/firestore'

export default {
  name: 'CardTask',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getPreferences'])
  },
  methods: {
    deleteTask() {
      firestoreDeleteTask(this.task.id)
    }
  }
}
</script>
