export default ({ app }, inject) => {
  inject('formattedDate', (inputFormat, s = '-') => {
    function pad (s) { return (s < 10) ? '0' + s : s }
    const d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(s)
  })
  inject('overlayLoading', {
    show: () => {
      app.store.commit('SET_LOADING', true)
    },
    hide: () => {
      app.store.commit('SET_LOADING', false)
    }
  })
  inject('sleep', ms => new Promise(resolve => setTimeout(resolve, ms)))
}
