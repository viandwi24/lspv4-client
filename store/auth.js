export const state = () => ({
  user: {},
  loggedIn: false,
  credentials: {},
})

export const mutations = {
  LOGGED (state, token) {
    state.loggedIn = true
    localStorage.setItem('token', token)
    console.log('LOGIN')
  },
  LOGOUT (state) {
    localStorage.removeItem('token')
    state.loggedIn = false
    state.user = {}
    state.credentials = {}
    console.log('LOGOUT')
  },
  SET_USER (state, data) {
    state.user = data
  },
  SET_CREDENTIALS (state, data) {
    state.credentials = data
  },
}

export const actions = {
  AFTER_LOGIN ({ commit }, { credentials, user, token }) {
    // const { $auth } = this
    commit('SET_CREDENTIALS', credentials)
    commit('SET_USER', user)
    commit('LOGGED', token)
  }
}
