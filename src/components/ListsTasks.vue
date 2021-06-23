<template>
  <div class="mx-4">
    <v-row v-if="tasks.length !== 0">
      <CardTask v-for="task of tasks" :key="task.id" :task="task" />
    </v-row>
    <div v-else class="text-h5">No tienes Tareas</div>
  </div>
</template>

<script>
import CardTask from './CardTask.vue'

export default {
  name: 'ListsTasks',
  components: { CardTask },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
}
</script>
