<template>
  <v-col cols="12" sm="6" md="4" lg="3" xl="2">
    <v-card dark :color="getPreferences.primaryColor">
      <v-card-title class="mb-1 justify-space-between">
        {{ list.title }}

        <div>
          <v-btn icon color="red" @click="deleteList">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <ListsTasks :tasks="tasks" />
      <CreateTask :idList="list.id" />
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateTask from './CreateTask.vue'
import ListsTasks from './ListsTasks.vue'
import { firestoreDeleteList } from '@/services/firestore'

export default {
  components: { CreateTask, ListsTasks },
  name: 'CardList',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getTasks', 'getPreferences']),
    tasks() {
      return this.getTasks.filter(task => task.idList === this.list.id)
    }
  },
  methods: {
    deleteList() {
      firestoreDeleteList(this.list.id)
    }
  }
}
</script>
