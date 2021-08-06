// import { computed } from "@nuxtjs/composition-api"

export default async (context, inject) => {
  const { store, $axios, redirect } = context

  // vars
  const obj = {
    state: {},
    user: {},
    loggedIn: false,
    login: undefined,
    logout: undefined,
    setObj: undefined,
    refreshUser: undefined,
  }
  const state = store.state.auth

  /**
   * Login
   * @param  {object} data
   */
  const login = function (data) {
    // await store.dispatch('auth/login', { email: 'wkokwokow', password: 'hehehe' })
    const options = {
      method: 'POST',
      url: '/auth/login',
      data,
    }
    return new Promise((resolve, reject) => {
      $axios(options).then((res) => {
        try {
          store.dispatch('auth/AFTER_LOGIN', { credentials: data, user: res.data.user, token: res.data.token })
          checkUserLogged().then((res) => resolve(res)).catch((err) => reject(err))
        } catch (err) {
        reject(err)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  const logout = function () {
    $axios.setHeader('Authorization', false)
    store.commit('auth/LOGOUT')
    obj.user = store.state.auth.user
    obj.loggedIn = store.state.auth.loggedIn
    redirect('/')
  }

  const setObj = function (user, loggedIn) {
    this.user = user
    this.loggedIn = loggedIn
  }

  const getUser = function () {
    const options = {
      method: 'GET',
      url: '/auth/user',
    }
    return new Promise((resolve, reject) => {
      $axios(options).then((res) => {
        resolve(res.data.user)
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * Check User Logged
   */
  const checkUserLogged = function () {
    const token = localStorage.getItem('token') || null
    return new Promise((resolve, reject) => {
      if (token) {
        $axios.setToken(token, 'Bearer')
        $axios.setHeader('Authorization', `Bearer ${token}`)
        getUser().then(user => {
          store.dispatch('auth/AFTER_LOGIN', { credentials: {}, user, token })
          obj.user = store.state.auth.user
          obj.loggedIn = store.state.auth.loggedIn
          // context.$auth.setObj(store.state.auth.user, store.state.auth.loggedIn)
          // console.log(context.$auth)
          resolve()
        }).catch((e) => {
          store.commit('auth/LOGOUT')
          obj.user = store.state.auth.user
          obj.loggedIn = store.state.auth.loggedIn
          // eslint-disable-next-line prefer-promise-reject-errors
          resolve()
        })
      } else {
        store.commit('auth/LOGOUT')
        obj.user = store.state.auth.user
        obj.loggedIn = store.state.auth.loggedIn
        // eslint-disable-next-line prefer-promise-reject-errors
        resolve()
      }
    })
  }

  // checking user login
  await checkUserLogged()

  //
  obj.state = state
  obj.login = login
  obj.logout = logout
  obj.setObj = setObj
  obj.refreshUser = checkUserLogged
  inject('auth', obj)
}
