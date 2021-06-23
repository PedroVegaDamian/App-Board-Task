<template>
  <div>
    <v-row v-if="boards.length !== 0">
      <CardBoard v-for="board of boards" :key="board.id" :board="board" />
    </v-row>
    <div v-else class="text-h5">No tienes tableros</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardBoard from './CardBoard.vue'

export default {
  name: 'ListsBoards',
  components: { CardBoard },
  computed: {
    ...mapGetters({ boards: 'getBoards' })
  }
}
</script>
