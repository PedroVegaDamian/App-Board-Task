<template>
  <v-container>
    <CreateBoard />
    <ListsBoards />
  </v-container>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CreateBoard from '@/components/CreateBoard.vue'
import ListsBoards from '@/components/ListsBoards.vue'

export default {
  name: 'PageHome',
  components: { CreateBoard, ListsBoards },
  created() {
    this.$emit('update:layout', DefaultLayout)
  }
}
</script>
