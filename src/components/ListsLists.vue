<template>
  <div>
    <v-row v-if="lists.length !== 0">
      <CardList v-for="list of lists" :key="list.id" :list="list" />
    </v-row>
    <div v-else class="text-h5">No tienes listas</div>
  </div>
</template>

<script>
import CardList from './CardList.vue'

export default {
  name: 'ListsLists',
  components: { CardList },
  props: {
    lists: {
      type: Array,
      required: true
    }
  }
}
</script>
