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
    console.log(res)
    if (!routeException.includes(route.name)) {
      if (res.status === 401) {
        redirect('/auth/logout')
      }
    }
    return Promise.reject(error)
  })
}
