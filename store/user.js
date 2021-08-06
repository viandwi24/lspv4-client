import phone from "phone"

function validator (input, data, { context: { $toast } }) {
  let anyError = false
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const key = item.key
    const value = item.value
    const rules = [...item.rules]
    if (rules.includes('required')) {
      if (value === "") {
        anyError = true
        $toast.error(`${key} tidak boleh kosong.`)
      }
    }

    if (rules.includes('phone')) {
      const test = phone(value, { country: 'IDN' })
      if (!test.isValid) {
        anyError = true
        $toast.error(`${key} bukan nomor telepon yang valid.`)
      }
    }

    if (rules.includes('password_confirmation')) {
      if (value !== input.password_confirmation) {
        anyError = true
        $toast.error(`konfirmasi ${key} tidak sama.`)
      }
    }
  }
  return !anyError
}

function errorsAction (error, { context: { $overlayLoading, $toast } }) {
  $overlayLoading.hide()
  if (error.response) {
    const errRes = error.response
    if (errRes.status === 422 && errRes.data && errRes.data.message && errRes.data.message === 'The given data was invalid.') {
      const errors = errRes.data.errors || []
      // let i = 0
      for (const index in errors) {
        // if (i === 1) break
        const error = errors[index]
        let msg = `${error[0]}`
        if (msg.includes('must be a string')) {
          msg = error[1]
        }
        $toast.error(msg)
        // i++
      }
    }
  } else {
    $toast.error('Error Server')
    throw new Error(error)
  }
}

export const actions = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.$auth.login(data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  },
  register ({ commit }, input) {
    const $this = this
    return new Promise((resolve, reject) => {
      try {
        // validator
        const valid = validator(input, [
          { key: 'nama', value: input.name, rules: ['required'] },
          { key: 'email', value: input.email, rules: ['required'] },
          { key: 'nomor telepon', value: input.phone, rules: ['required', 'phone'] },
          { key: 'password', value: input.password, rules: ['required', 'password_confirmation'] },
          { key: 'konfirmasi password', value: input.password_confirmation, rules: ['required'] },

          { key: 'tempat lahir', value: input.data.place_of_birth, rules: ['required'] },
          { key: 'tanggal lahir', value: input.data.date_of_birth, rules: ['required'] },
          { key: 'Kebangsaan', value: input.data.nationality, rules: ['required'] },
          { key: 'Pendidikan Terakhir', value: input.data.last_education, rules: ['required'] },
          { key: 'Alamat Rumah', value: input.data.address, rules: ['required'] },

          { key: 'Pekerjaan', value: input.data.job, rules: ['required', 'boolean'] },
          { key: 'Nama Pekerjaan', value: input.data.company.name, rules: ['required'] },
          { key: 'Jabatan Pekerjaan', value: input.data.company.position, rules: ['required'] },
          { key: 'Alamat Pekerjaan', value: input.data.company.address, rules: ['required'] },
          { key: 'Email Pekerjaan', value: input.data.company.email, rules: ['required'] },
          { key: 'Nomor Telepon Pekerjaan', value: input.data.company.phone, rules: ['required', 'phone'] },
        ], { context: $this })
        if (!valid) return reject(valid)

        // register
        this.$axios({
          method: 'post',
          url: '/auth/register',
          data: input
        }).then(response => resolve(response)).catch(err => {
          errorsAction(err, { context: $this })
          reject(err)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

