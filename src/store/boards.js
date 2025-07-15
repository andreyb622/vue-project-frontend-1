import { defineStore } from 'pinia'
import service from '../services/service'

export const useBoardsStore = defineStore('boards', {
  state: () => ({
    boards: [],
    board: [],
    users: [],
  }),
  
  getters: {
    getBoards: (state) => state.boards,
    getBoard: (state) => state.board,
    getUsers: (state) => state.users,
  },
  
  actions: {
    async fetchBoards() {
      try {
        const boards = await service.getBoards()
        this.boards = boards
      } catch (e) {
        console.log(e)
      }
    },
    
    async fetchBoard(id) {
      try {
        const board = await service.getBoard(id)
        this.board = board
      } catch (e) {
        console.log(e)
      }
    },
  },
})