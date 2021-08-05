import { useContext } from '@nuxtjs/composition-api'

const useCrud = (url = '', root = undefined) => {
  let $swal, $overlayLoading, $sleep, $toast, $axios, http

  if (root) {
    $swal = root.$swal
    $overlayLoading = root.$overlayLoading
    $sleep = root.$sleep
    $toast = root.$toast
    $axios = root.$axios
    http = $axios
  } else {
    const ctx = useContext()
    $swal = ctx.$swal
    $overlayLoading = ctx.$overlayLoading
    $sleep = ctx.$sleep
    $toast = ctx.$toast
    $axios = ctx.$axios
    http = $axios
  }

  const read = async (params = []) => {
    const res = await http({
      method: 'get',
      url,
      params
    })
    return res
  }

  const errorsAction = (error) => {
    $overlayLoading.hide()
    if (error.response) {
      const errRes = error.response
      if (errRes.status === 422 && errRes.data && errRes.data.message && errRes.data.message === 'The given data was invalid.') {
        const errors = errRes.data.errors || []
        let i = 0
        for (const index in errors) {
          if (i === 1) {
            break
          }
          const error = errors[index]
          let msg = `${error[0]}`
          if (msg.includes('must be a string')) {
            msg = error[1]
          }
          $toast.error(msg)
          i++
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (errRes.data.message) {
          $toast.error(errRes.data.message)
        }
      }
    } else {
      $toast.error('Error Server')
    }
  }

  const create = (...args) => {
    if (args.length === 0) return
    let data = {}
    let text = 'Yakin ingin menambahkan data ini?'
    let showModal = true
    let params = {}
    let headers = {}

    if (typeof args[0] === 'object' && (args[0].data || args[0].params)) {
      const obj = args[0]
      if (obj.data) data = obj.data
      if (obj.text) text = obj.text
      if (obj.showModal) showModal = obj.showModal
      if (obj.params) params = obj.params
      if (obj.headers) headers = obj.headers
    } else {
      if (args[0]) data = args[0]
      if (args[1]) text = args[1]
      if (args[2]) showModal = args[2]
    }

    return new Promise((resolve, reject) => {
      const cancel = () => {
        reject(new Error('Cancelled'))
      }

      const httpRun = () => http({
        method: 'post',
        url,
        data,
        params,
        headers,
      }).then((res) => {
        resolve(res)
      }).catch((error) => {
        errorsAction(error)
        throw new Error(error)
      }).finally(() => {
        $overlayLoading.hide()
      })

      if (showModal) {
        $swal({
          title: 'Apakah kamu yakin?',
          text,
          icon: 'question',
          showCancelButton: true,
          allowOutsideClick: false
        }).then((m) => {
          if (!m) cancel()
          $overlayLoading.show()
          httpRun()
        })
      } else {
        $overlayLoading.show()
        httpRun()
      }
    })
  }

  const show = async (id) => {
    const res = await http({
      method: 'get',
      url: `${url}/${id}`
    })
    return res
  }

  const update = async (id, data, text = 'Yakin ingin menyimpan perubahan pada data ini?', showModal = true) => {
    let modal
    if (showModal) {
      modal = await $swal({
        title: 'Apakah kamu yakin?',
        text,
        icon: 'question',
        showCancelButton: true,
        allowOutsideClick: false
      })
    }
    if (!showModal || (modal && modal.isConfirmed)) {
      $overlayLoading.show()
      await $sleep(50)
      let res
      try {
        res = await http({
          method: 'put',
          url: `${url}/${id}`,
          data
        })
      } catch (error) {
        errorsAction(error)
        throw new Error(error)
      }
      $overlayLoading.hide()
      return res
    } else {
      throw new Error('user canceled')
    }
  }

  const destroy = async (id, permanentDelete = false, text = '', showModal = true) => {
    let modal
    if (showModal) {
      modal = await $swal({
        title: 'Apakah kamu yakin?',
        text,
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false
      })
    }
    const data = {}
    if (permanentDelete) {
      data.destroy = true
    }

    if (!showModal || (modal && modal.isConfirmed)) {
      $overlayLoading.show()
      await $sleep(50)
      let res
      try {
        res = await http({
          method: 'delete',
          url: `${url}/${id}`,
          data
        })
      } catch (error) {
        errorsAction(error)
        throw new Error(error)
      }
      $overlayLoading.hide()
      return res
    } else {
      throw new Error('user canceled')
    }
  }

  const restore = async (id, text) => {
    const modal = await $swal({
      title: 'Apakah kamu yakin?',
      text,
      icon: 'question',
      showCancelButton: true,
      allowOutsideClick: false
    })

    if (modal.isConfirmed) {
      $overlayLoading.show()
      await $sleep(50)
      let res
      try {
        res = await http({
          method: 'get',
          url: `${url}/${id}`,
          params: {
            restore: true
          }
        })
      } catch (error) {
        errorsAction(error)
        throw new Error(error)
      }
      $overlayLoading.hide()
      return res
    } else {
      throw new Error('user canceled')
    }
  }

  return {
    url,
    show,
    create,
    read,
    update,
    destroy,
    restore
  }
}

const inputOnly = (form, data, only = []) => {
  for (const i in only) {
    const key = only[i]
    form[key] = data[key]
  }
}

export { useCrud, inputOnly }
