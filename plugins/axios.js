function safeUrl () {
  const baseurl = process.env.API_BASE_URL
  const prefix = process.env.API_PREFIX
  return baseurl + '/' + prefix
}

export default function ({ $axios, redirect, route }) {
  $axios.setBaseURL(safeUrl())
  $axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    const routeException = ['auth-login']
    const res = error.response
    if (!routeException.includes(route.name)) {
      console.log(route.name)
      // if (res.status === 401) {
      //   redirect('/auth/logout')
      // }
    }
    console.log(res)
    return Promise.reject(error)
  })
}
