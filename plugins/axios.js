function safeUrl () {
  const baseurl = process.env.API_BASE_URL
  const prefix = process.env.API_PREFIX
  return baseurl + '/' + prefix
}

export default function ({ $axios, redirect }) {
  $axios.setBaseURL(safeUrl())
  $axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    console.log({ error, res: error.response })
    const res = error.response
    if (res.status === 401) {
      redirect('/auth/logout')
    }
    return Promise.reject(error)
  })
}
