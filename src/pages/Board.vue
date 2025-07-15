<template>
  <div class="wrapper">
    <div class="info">
      <h2 class="board-name light-bg">{{ getBoard.boardName }}</h2>
      <div class="users">
        <div class="users-header">Пользователи</div>
        <div class="light-bg" v-for="(user, index) in getUsers" :key="index">
          {{ user.username }}
        </div>
      </div>
    </div>
    <div class="board-lists">
      <board-list
        v-for="boardList in getBoard.boardListId"
        :key="boardList._id"
        :boardListName="boardList.boardListName"
        :id="boardList._id"
        :cards="boardList.cardId"
      >
      </board-list>
    </div>
  </div>
</template>

<script>
import { useBoardsStore } from "../store/boards";
import BoardList from "../components/BoardList";

export default {
  props: ["id"],
  components: {
    BoardList,
  },
  setup() {
    const boardsStore = useBoardsStore();
    return { boardsStore };
  },
  mounted() {
    this.boardsStore.fetchBoard(this.id);
  },
  computed: {
    getBoard() {
      return this.boardsStore.getBoard;
    },
    getUsers() {
      return this.boardsStore.getUsers;
    },
  },
  methods: {
    changeListName() {
      this.listHeaderFocus = false;
      console.log(this.listHeader);
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: rgba(2, 106, 167, 0.7);
  display: flex;
  height: 87.6vh;
  flex-direction: column;
}

.light-bg {
  color: rgb(255, 255, 255);
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  font: inherit;
}

h2 {
  font: inherit;
}

.info {
  margin: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  column-gap: 0.5rem;
}

.users {
  display: flex;
  column-gap: 0.3rem;
  align-items: center;
}

.users-header {
  color: rgb(255, 255, 255);
}

.board-lists {
  display: flex;
  margin: 0.3rem;
  column-gap: 0.7rem;
}

.list-wrapper {
  width: 15%;
  padding: 0.5rem;
  background-color: rgb(93 86 86 / 30%);
  border-radius: 3px;
  font: inherit;
}

.card {
  border-radius: 3px;
  margin-top: 0.3rem;
  padding: 0.5rem;
  width: inherit;
  background: rgb(255, 255, 255);
  color: black;
}

.light-bg:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
