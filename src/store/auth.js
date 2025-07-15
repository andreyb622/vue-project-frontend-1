import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
  }),
  
  getters: {
    isAuth: (state) => state.token ? true : false,
  },
  
  actions: {
    async login(payload) {
      try {
        const response = await axios.post('/auth/login', payload)
        const token = response.data.token
        const id = response.data.user._id
        
        localStorage.setItem('token', token)
        localStorage.setItem('userId', id)
        
        this.token = token
        this.userId = id
      } catch (e) {
        console.log('err', e)
      }
    },
    
    logout() {
      this.token = null
      this.userId = null
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      delete axios.defaults.headers.common['Authorization']
    },
    
    async signUp(user) {
      const response = await axios.post('/users', user)
      return response
    },
  },
})