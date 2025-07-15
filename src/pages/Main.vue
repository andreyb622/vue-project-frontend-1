<template>
  <div class="wrapper">
    <router-link
      class="board"
      v-for="(boards, i) in getBoards"
      :key="boards._id"
      :to="{ name: 'board', params: { id: boards._id } }"
    >
      {{ getBoards[i].boardName }}
    </router-link>
    <div class="board">создать доску</div>
  </div>
</template>

<script>
import { useBoardsStore } from "../store/boards";

export default {
  setup() {
    const boardsStore = useBoardsStore();
    return { boardsStore };
  },
  mounted() {
    this.boardsStore.fetchBoards();
  },
  computed: {
    getBoards() {
      return this.boardsStore.getBoards;
    },
  },
  methods: {
    get() {},
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  align-items: center;
  height: 87.6vh;
}

.board {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 10rem;
  height: 5rem;
  background: #026aa7;
  border-radius: 0.5rem;
}

.board:hover {
  background-color: #61a4ca;
}

a {
  text-decoration: none;
}
</style>
