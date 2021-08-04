export const state = () => ({
  app: {},
  loading: false,
  theme: 'light'
})

export const mutations = {
  SET_APP (state, app) {
    state.app = app
  },
  SET_LOADING (state, isLoading) {
    state.loading = isLoading
  }
}
