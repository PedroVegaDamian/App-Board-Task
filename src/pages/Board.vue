<template>
  <v-container class="pt-5">
    <div v-if="board">
      <div class="text-h4 font-weight-bold text-center">
        {{ board.title }}
      </div>
      <CreateList :idBoard="board.id" />
      <ListsLists :lists="lists" />
    </div>
    <div v-else class="text-h5">Cargando...</div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CreateList from '@/components/CreateList.vue'
import ListsLists from '@/components/ListsLists.vue'

export default {
  name: 'Board',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: { CreateList, ListsLists },
  computed: {
    ...mapGetters(['getBoards', 'getLists']),
    board() {
      return this.getBoards.find(board => board.id === this.id)
    },
    lists() {
      return this.getLists.filter(list => list.idBoard === this.id)
    }
  },
  created() {
    this.$emit('update:layout', DefaultLayout)
  }
}
</script>
