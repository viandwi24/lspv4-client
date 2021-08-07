// import { computed } from "@nuxtjs/composition-api"

export default async (context, inject) => {
  await injectInstance(inject, context)
  await injectRouter(context)
}

// console.log(to)
// const loggedIn = localStorage.getItem("auth");
// const isAuth = to.matched.some((record) => record.meta.requiresAuth);
// const isHide = to.matched.some((record) => record.meta.hideForAuth);

// if (isAuth && !loggedIn) {
//   return next({ path: "/login" });
// } else if (isHide && loggedIn) {
//   return next({ path: "/" });
// }

// if (!$auth.loggedIn) {
//   return redirect({ name: 'auth-login' })
// }


export function injectRouter({ $auth, app: { router } }) {
  router.beforeEach(async (to, from, next) => {
    //
    const isAuthLoginPage = to.matched.some((record) => record.name === 'auth-login')
    const isAuthVerificationPage = to.matched.some((record) => record.name === 'auth-verification')
    const isAuthLogoutnPage = to.matched.some((record) => record.name === 'auth-logout')
    const isDashboardPage = to.matched.some((record) => record.name === 'dashboard')
    const isAccessionPage = to.matched.some((record) => `${record.name}`.split('-').includes('accession'))
    const isAdminPage = to.matched.some((record) => `${record.name}`.split('-').includes('admin'))

    // check login or not
    if ($auth.loggedIn) {

      // if auth - login
      if (isAuthLoginPage) {
        return next({ path: '/dashboard' })
      }

      // if auth - verifcation
      if (isAuthVerificationPage) {
        if ($auth.user.email_verified_at) {
          return next({ path: '/dashboard' })
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (!$auth.user.email_verified_at) {
          return next({ path: '/auth/verification' })
        }
      }

      // if dashboard
      if (isDashboardPage) {
        const role = $auth.user.role
        const route = (role === 'Accession' ? 'Accession' : (role === 'assessor' ? 'Asesor' : 'Admin'))
        return next({ path: `/${(route).toLowerCase()}` })
      }

      // if auth - logout
      if (isAuthLogoutnPage) {
        await $auth.logout()
        return next({ path: '/' })
      }

      // if role
      if (isAccessionPage) if ($auth.user.role !== 'Accession') return next({ path: '/dashboard' })
      if (isAdminPage) if ($auth.user.role !== 'Admin') return next({ path: '/dashboard' })

    // check logout or not
    } else {

      // if dashboard
      if (isDashboardPage) {
        return next({ path: '/' })
      }

      // if auth - verifcation
      if (isAuthVerificationPage || isAuthLogoutnPage) {
        return next({ path: '/' })
      }
    }




    // nothing to do
    return next();
  });
}

export async function injectInstance (inject, context) {
  const { store, $axios } = context

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
    const options = {
      method: 'POST',
      url: '/auth/logout',
    }
    return new Promise((resolve, reject) => {
      $axios(options).then((res) => {
        try {
          $axios.setHeader('Authorization', false)
          store.commit('auth/LOGOUT')
          obj.user = store.state.auth.user
          obj.loggedIn = store.state.auth.loggedIn
          resolve()
        } catch (error) {
          resolve()
        }
      }).catch(() => {
        $axios.setHeader('Authorization', false)
        store.commit('auth/LOGOUT')
        obj.user = store.state.auth.user
        obj.loggedIn = store.state.auth.loggedIn
        resolve()
      })
    })
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
