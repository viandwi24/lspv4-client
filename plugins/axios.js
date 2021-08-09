function safeUrl () {
  const baseurl = process.env.API_BASE_URL
  const prefix = process.env.API_PREFIX
  return baseurl + '/' + prefix
}

export default function ({ $axios, redirect, route, $auth, app }) {
  $axios.setBaseURL(safeUrl())
  $axios.interceptors.response.use(function (response) {
    return response
  }, async function (error) {
    const routeException = ['auth-login']
    const res = error.response
    if (routeException.includes(app.router.app._route) === false) {
      // console.log(res.status === 403)
      if (res.status === 401 || res.status === 403) {
        console.log(res)
        try {
          await app.$auth.logout()
          app.router.push('/')
        } catch (error) {
        }
      }
    }
    return Promise.reject(error)
  })
  // $axios.interceptors.request.use(function (config) {
  //   return config
  // }, function (error) {
  //   const routeException = ['auth-login']
  //   const res = error.response
  //   if (routeException.includes(route.name) === false) {
  //     if (res.status === 401) {
  //       if (app.$auth.loggedIn) app.$auth.logout().then(() => redirect('/'))
  //     }
  //   }
  //   return Promise.reject(error)
  // })
}
