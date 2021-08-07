import phone from "phone"

function validator (input, data, { context: { $toast } }) {
  let anyError = false

  //
  const errorRequired = (key) => {
    anyError = true
    $toast.error(`${key} tidak boleh kosong.`)
  }

  //
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const key = item.key
    const value = item.value
    const rules = [...item.rules]
    if (rules.includes('required')) {
      if (!(/([^\s])/.test(value))) {
        errorRequired(key)
        continue
      }
    }

    if (rules.includes('phone')) {
      if (!(/([^\s])/.test(value))) continue
      const test = phone(value, { country: 'IDN' })
      if (!test.isValid) {
        anyError = true
        $toast.error(`${key} bukan nomor telepon yang valid.`)
      }
    }

    if (rules.includes('password_confirmation')) {
      if (!(/([^\s])/.test(value))) continue
      if (value !== input.password_confirmation) {
        anyError = true
        $toast.error(`konfirmasi ${key} tidak sama.`)
      }
    }

    const regexIncludes = /in:.*/g ;
    const findRuleIncludes = rules.find(e => regexIncludes.test(e))
    if (findRuleIncludes) {
      if (!(/([^\s])/.test(value))) continue
      const accArray = `${findRuleIncludes}`.split('in:')[1].split(',')
      if (!accArray.includes(value)) {
        anyError = true
        $toast.error(`${key} tidak valid.`)
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
          { key: 'Tanda Tangan', value: input.signature, rules: ['required'] },

          { key: 'Nomor Identitas', value: input.data.identity_number, rules: ['required'] },
          { key: 'Jenis Kelamin', value: input.data.gender, rules: ['required', 'in:Male,Female'] },
          { key: 'tempat lahir', value: input.data.place_of_birth, rules: ['required'] },
          { key: 'tanggal lahir', value: input.data.date_of_birth, rules: ['required'] },
          { key: 'Kebangsaan', value: input.data.nationality, rules: ['required'] },
          { key: 'Pendidikan Terakhir', value: input.data.last_education, rules: ['required'] },
          { key: 'Alamat Rumah', value: input.data.address, rules: ['required'] },

          { key: 'Pekerjaan', value: input.data.job, rules: ['required', 'boolean'] },
          { key: 'Nama Pekerjaan', value: input.data.company.name, rules: [] },
          { key: 'Jabatan Pekerjaan', value: input.data.company.position, rules: [] },
          { key: 'Alamat Pekerjaan', value: input.data.company.address, rules: [] },
          { key: 'Email Pekerjaan', value: input.data.company.email, rules: [] },
          { key: 'Nomor Telepon Pekerjaan', value: input.data.company.phone, rules: ['phone'] },
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

