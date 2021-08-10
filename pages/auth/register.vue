<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="goBack" />
      </div>
      <div class="ribbon">
        <h2>DAFTAR</h2>
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
            <div class="mb-4">
              <label for="inputPassword" class="form-label">Password</label>
              <input id="inputPassword" v-model="input.password" type="password" class="form-control" placeholder="Password" autocomplete="off">
            </div>
            <div class="mb-4">
              <label for="inputPasswordConfirmation" class="form-label">Konfirmasi Password</label>
              <input id="inputPasswordConfirmation" v-model="input.password_confirmation" type="password" class="form-control" placeholder="Konfirmasi Password" autocomplete="off">
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
              <label for="inputNationality" class="form-label">Kebangsaan</label>
              <input id="inputNationality" v-model="input.data.nationality" type="text" class="form-control" placeholder="Kebangsaan" autocomplete="off">
            </div>
            <div class="mb-2">
              <label for="inputLastEducation" class="form-label">Pendidikan Terakhir</label>
              <input id="inputLastEducation" v-model="input.data.last_education" type="text" class="form-control" placeholder="Pendidikan Terakhir" autocomplete="off">
            </div>
            <div class="mb-2">
              <label for="inputAddress" class="form-label">Alamat Rumah</label>
              <textarea id="inputAddress" v-model="input.data.address" class="form-control" placeholder="Alamat Rumah" autocomplete="off" />
            </div>
          </section>

          <!-- section 3 -->
          <section class="tw-mb-16">
            <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-border-b-2 tw-border-gray-500 tw-mb-2">
              Pekerjaan
            </div>
            <div class="mb-2 tw-flex tw-flex-row tw-space-x-6 tw-justify-center">
              <div class="form-check">
                <input id="inputJob1" v-model="input.data.job" class="form-check-input" type="radio" name="inputJob" value="1">
                <label class="form-check-label" for="inputJob1">
                  Saya Bekerja
                </label>
              </div>
              <div class="form-check">
                <input id="inputJob2" v-model="input.data.job" class="form-check-input" type="radio" name="inputJob" value="0">
                <label class="form-check-label" for="inputJob2">
                  Saya Tidak Bekerja
                </label>
              </div>
            </div>
            <!-- name -->
            <div class="mb-2">
              <label for="inputCompanyName" class="form-label tw-self-center">Nama</label>
              <input id="inputCompanyName" v-model="input.data.company.name" type="text" class="form-control" placeholder="Nama Lembaga / Perusahaan" :disabled="(`${input.data.job}` === '0')">
            </div>
            <!-- position -->
            <div class="mb-2">
              <label for="inputCompanyPosition" class="form-label tw-self-center">Jabatan</label>
              <input id="inputCompanyPosition" v-model="input.data.company.position" type="text" class="form-control" placeholder="Jabatan" :disabled="(`${input.data.job}` === '0')">
            </div>
            <!-- address -->
            <div class="mb-2">
              <label for="inputCompanyAddress" class="form-label tw-self-center">Alamat</label>
              <input id="inputCompanyAddress" v-model="input.data.company.address" type="text" class="form-control" placeholder="Alamat" :disabled="(`${input.data.job}` === '0')">
            </div>
            <!-- email -->
            <div class="mb-2">
              <label for="inputCompanyEmail" class="form-label tw-self-center">Email</label>
              <input id="inputCompanyEmail" v-model="input.data.company.email" type="text" class="form-control" placeholder="Email" :disabled="(`${input.data.job}` === '0')">
            </div>
            <!-- phone -->
            <div class="mb-2">
              <label for="inputCompanyPhone" class="form-label tw-self-center">Nomor Telepon</label>
              <input id="inputCompanyPhone" v-model="input.data.company.phone" type="text" class="form-control" placeholder="Nomor Telepon" :disabled="(`${input.data.job}` === '0')">
            </div>
          </section>

          <!-- section 4 -->
          <section class="tw-mb-16">
            <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-border-b-2 tw-border-gray-500 tw-mb-2">
              Tanda Tangan
            </div>
            <div class="mb-2 tw-flex tw-flex-col tw-justify-center">
              <VueSignaturePad ref="signature" width="300px" height="300px" :custom-style="{ border: 'black 1px solid' }" class="tw-self-center" />
              <div class="tw-flex tw-space-x-2 tw-justify-center tw-mt-2">
                <button class="btn btn-sm btn-danger" @click="signatureClear">Bersihkan</button>
                <button class="btn btn-sm btn-primary" @click="signatureUndo">Undo</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
          <Button text="DAFTAR" :styles="[ 'big', 'blue' ]" :icon="['fas', 'sign-in-alt']" @click.native.prevent="register" />
          <!-- <Button text="KEMBALI" :styles="[ 'big', 'yellow' ]" :icon="['fas', 'arrow-left']" @click.native.prevent="goBack" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive, useContext, useStore } from '@nuxtjs/composition-api'
export default {
  layout: 'page',
  middleware: 'guest',
  transition: 'page',
  setup (_, { refs }) {
    const store = useStore()
    const { redirect, $overlayLoading, $sleep } = useContext()
    const input = reactive({
      // name: 'Alfian Dwi Nugraha',
      // email: 'viandwicyber@gmail.com',
      // phone: '087703211405',
      // password: '12345',
      // password_confirmation: '12345',
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      signature: '',
      identity_number: '',
      gender: 'Male',
      data: {
        last_education: '',
        nationality: '',
        job: 0,
        place_of_birth: '',
        date_of_birth: '',
        address: '',
        company: {
          name: '',
          position: '',
          address: '',
          email: '',
          phone: '',
        },
      },
    })

    const goBack = () => {
      redirect('/')
    }

    const register = async () => {
      const getSignatureImage = () => {
        const { data } = refs.signature.saveSignature()
        return data
      }
      input.signature = getSignatureImage()
      const data = input
      $overlayLoading.show()
      await $sleep(1000)
      store.dispatch('user/register', data).then(() => {
        store.dispatch('user/login', data).then(() => {
          redirect('/auth/verification')
        }).finally(() => $overlayLoading.hide())
      }).catch(() => {
        $overlayLoading.hide()
      })
    }


    // const
    const onRezise = () => {
      refs.signature.resizeCanvas()
    }
    onMounted(() => {
      document.addEventListener('rezise', onRezise)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('rezise', onRezise)
    })

    //
    const signatureUndo = () => refs.signature.undoSignature()
    const signatureClear = () => refs.signature.clearSignature()

    return {
      input,
      register,
      goBack,
      signatureUndo,
      signatureClear,
    }
  }
}
</script>
