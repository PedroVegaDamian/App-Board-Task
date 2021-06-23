import Vue from 'vue'
import Vuex from 'vuex'
import {
  authSignIn,
  authSignOut,
  authSignUp,
  getCurrentUser
} from '@/services/auth'
import { firebaseFirestore } from '@/.firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    boards: [],
    lists: [],
    tasks: [],
    preferences: {
      modeDark: false,
      primaryColor: 'primary',
      secondaryColor: 'secondary'
    }
  },
  getters: {
    getBoards: state => state.boards,
    getLists: state => state.lists,
    getTasks: state => state.tasks,
    getPreferences: state => state.preferences
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_BOARDS(state, boards) {
      state.boards = boards
    },
    SET_LISTS(state, lists) {
      state.lists = lists
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    SET_THEME(state, { primaryColor, secondaryColor }) {
      Vue.set(state.preferences, 'primaryColor', primaryColor)
      Vue.set(state.preferences, 'secondaryColor', secondaryColor)
    }
  },
  actions: {
    async signUp(_, { email, password }) {
      return await authSignUp(email, password)
    },
    async signIn(_, { email, password }) {
      return await authSignIn(email, password)
    },
    async signOut({ commit, dispatch }) {
      await authSignOut()
      dispatch('setCurrentUser')
      commit('SET_BOARDS', [])
    },
    async setCurrentUser({ commit }) {
      const user = getCurrentUser()
      commit('SET_USER', user ? { uid: user.uid, email: user.email } : null)
    },
    async getBoards({ commit }) {
      const { uid } = await getCurrentUser()

      firebaseFirestore
        .collection('boards')
        .where('userId', '==', uid)
        .onSnapshot(
          querySnapshot => {
            const boards = []
            querySnapshot.forEach(doc => {
              boards.push(doc.data())
            })
            commit('SET_BOARDS', boards)
          },
          error => {
            if (error.code !== 'permission-denied') {
              console.error(error)
            }
          }
        )
    },
    async getLists({ commit }) {
      const { uid } = await getCurrentUser()

      firebaseFirestore
        .collection('lists')
        .where('userId', '==', uid)
        .onSnapshot(
          querySnapshot => {
            const lists = []
            querySnapshot.forEach(doc => {
              lists.push(doc.data())
            })
            commit('SET_LISTS', lists)
          },
          error => {
            if (error.code !== 'permission-denied') {
              console.error(error)
            }
          }
        )
    },
    async getTasks({ commit }) {
      const { uid } = await getCurrentUser()

      firebaseFirestore
        .collection('tasks')
        .where('userId', '==', uid)
        .onSnapshot(
          querySnapshot => {
            const tasks = []
            querySnapshot.forEach(doc => {
              tasks.push(doc.data())
            })
            commit('SET_TASKS', tasks)
          },
          error => {
            if (error.code !== 'permission-denied') {
              console.error(error)
            }
          }
        )
    }
  }
})
