<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="goBack" />
      </div>
      <div class="ribbon">
        <h2>PROFIL</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center tw-px-6">
        <div class="form mt-4 tw-py-1">
          <!-- section 1 -->
          <section class="tw-mb-16">
            <div class="mb-2">
              <label for="inputName" class="form-label">Nama Lengkap</label>
              <input id="inputName" v-model="input.name" type="text" class="form-control" placeholder="Nama Lengkap" autocomplete="off">
            </div>
            <div class="mb-2">
              <label for="inputEmail" class="form-label">Email</label>
              <input id="inputEmail" v-model="input.email" type="email" class="form-control" placeholder="Email" autocomplete="off">
            </div>
            <div class="mb-2">
              <label for="inputPhone" class="form-label">Nomor Telepon</label>
              <input id="inputPhone" v-model="input.phone" type="text" class="form-control" placeholder="Nomor Telepon" autocomplete="off">
            </div>
          </section>

          <!-- section 2 -->
          <section class="tw-mb-16">
            <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-border-b-2 tw-border-gray-500 tw-mb-4">
              Data Diri
            </div>
            <div class="mb-2">
              <label for="inputGender" class="form-label">Jenis Kelamin</label>
              <select id="inputGender" v-model="input.gender" class="form-control" placeholder="Jenis Kelamin" autocomplete="off">
                <option value="Male">Pria</option>
                <option value="Female">Wanita</option>
              </select>
            </div>
            <div class="mb-2">
              <label for="inputNumberIdentity" class="form-label">Nomor Identitas</label>
              <input id="inputNumberIdentity" v-model="input.identity_number" type="text" class="form-control" placeholder="Nomor Identitas" autocomplete="off">
            </div>
            <div class="mb-2">
              <label for="inputRegistrationNumber" class="form-label">Nomor Registrasi BNSP</label>
              <input id="inputRegistrationNumber" v-model="input.data.registration_number" type="text" class="form-control" placeholder="Nomor Registrasi" autocomplete="off">
            </div>
            <div class="mb-2">
              <label for="inputUserPlaceOfBirth" class="form-label tw-self-center">Tempat Lahir</label>
              <div class="tw-flex tw-space-x-2">
                <div class="tw-w-5/12">
                  <input id="inputUserPlaceOfBirth" v-model="input.data.place_of_birth" type="text" class="form-control" placeholder="Tempat Lahir">
                </div>
                <div class="tw-w-7/12">
                  <input id="inputUserDateOfBirth" v-model="input.data.date_of_birth" type="date" class="form-control" placeholder="Tanggal Lahir">
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label for="inputAddress" class="form-label">Alamat Rumah</label>
              <textarea id="inputAddress" v-model="input.data.address" class="form-control" placeholder="Alamat Rumah" autocomplete="off" />
            </div>
          </section>

          <!-- section 3 -->

          <!-- section 4 -->
          <section class="tw-mb-16">
            <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-border-b-2 tw-border-gray-500 tw-mb-2">
              Tanda Tangan
            </div>
            <div class="mb-2 tw-flex tw-flex-col tw-justify-center">
              <input id="filesignature" type="file" accept="image/*" style="display: none;" @change="onFileSignatureChange">
              <VueSignaturePad ref="signature" width="300px" height="300px" :custom-style="{ border: 'black 1px solid' }" class="tw-self-center" />
              <div class="tw-flex tw-space-x-2 tw-justify-center tw-mt-2">
                <button class="btn btn-sm btn-danger" @click="signatureClear">Bersihkan</button>
                <button class="btn btn-sm btn-primary" @click="signatureUndo">Undo</button>
                <button class="btn btn-sm btn-secondary" @click="signatureLoad">Load dari gambar</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
          <Button text="SIMPAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native.prevent="save" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, reactive, useContext, useStore } from '@nuxtjs/composition-api'
export default {
  layout: 'page',
  middleware: 'guest',
  transition: 'page',
  setup (_, { refs }) {
    // const store = useStore()
    const { redirect, $auth, $overlayLoading, $moment } = useContext()
    const store = useStore()
    const user = computed(() => $auth.state.user)
    const input = reactive({
      name: user.value.name,
      email: user.value.email,
      phone: user.value.phone,
      password: user.value.password,
      password_confirmation: user.value.password_confirmation,
      signature: user.value.signature,
      identity_number: user.value.identity_number,
      gender: user.value.gender,
      data: {
        place_of_birth: user.value.data.place_of_birth,
        date_of_birth: $moment(user.value.data.date_of_birth).format('YYYY-MM-DD').toString(),
        address: user.value.data.address,
        registration_number: user.value.data.registration_number,
      }
      // data: {
      //   last_education: user.value.data.last_education,
      //   nationality: user.value.data.nationality,
      //   job: user.value.data.job,
      //   place_of_birth: user.value.data.place_of_birth,
      //   date_of_birth: $moment(user.value.data.date_of_birth).format('YYYY-MM-DD').toString(),
      //   address: user.value.data.address,
      //   company: {
      //     name: user.value.data.company_name,
      //     position: user.value.data.company_position,
      //     address: user.value.data.company_address,
      //     email: user.value.data.company_email,
      //     phone: user.value.data.company_phone,
      //   },
      // },
    })

    const goBack = () => {
      redirect('/accession')
    }

    const save = async () => {
      const getSignatureImage = () => {
        const { data } = refs.signature.saveSignature()
        return data
      }
      input.signature = await getSignatureImage()
      const data = input
      store.dispatch('user/update', data).then(async () => await refreshData())
    }

    const refreshData = async () => {
      $overlayLoading.show()
      await $auth.refreshUser()
      input.name = user.value.name
      input.email = user.value.email
      input.phone = user.value.phone
      input.password = user.value.password
      input.password_confirmation = user.value.password_confirmation
      input.signature = user.value.signature
      input.identity_number = user.value.identity_number
      input.gender = user.value.gender
      input.data.place_of_birth = user.value.data.place_of_birth
      input.data.date_of_birth = $moment(user.value.data.date_of_birth).format('YYYY-MM-DD').toString()
      input.data.address = user.value.data.address
      input.data.registration_number = user.value.data.registration_number

      // input.data.last_education = user.value.data.last_education
      // input.data.nationality = user.value.data.nationality
      // input.data.job = user.value.data.job
      // input.data.company.name = user.value.data.company_name
      // input.data.company.position = user.value.data.company_position
      // input.data.company.address = user.value.data.company_address
      // input.data.company.email = user.value.data.company_email
      // input.data.company.phone = user.value.data.company_phone
      await refs.signature.fromDataURL(input.signature)
      $overlayLoading.hide()

      if (!$auth.user.email_verified_at) {
        return redirect('/auth/verification')
      }
    }

    // const
    const onRezise = () => {
      refs.signature.resizeCanvas()
    }
    onMounted(async () => {
      document.addEventListener('rezise', onRezise)
      await refreshData()
    })
    onBeforeUnmount(() => {
      document.removeEventListener('rezise', onRezise)
    })

    //
    const signatureUndo = () => refs.signature.undoSignature()
    const signatureClear = () => refs.signature.clearSignature()
    const signatureLoad = () => {
      const file = document.querySelector('#filesignature')
      file.value = ''
      file.click()
    }
    const onFileSignatureChange = async function (e) {
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      const image = await toBase64(e.target.files[0])
      refs.signature.clearSignature()
      await refs.signature.fromDataURL(image)
    }

    return {
      input,
      save,
      goBack,
      signatureUndo,
      signatureClear,
      signatureLoad,
      onFileSignatureChange,
    }
  }
}
</script>
