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
        <form class="mt-4 tw-py-1">
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
                <input id="inputCompanyName" v-model="input.data.company.name" type="text" class="form-control" placeholder="Nama Lembaga / Perusahaan">
              </div>
              <!-- position -->
              <div class="mb-2">
                <label for="inputCompanyPosition" class="form-label tw-self-center">Jabatan</label>
                <input id="inputCompanyPosition" v-model="input.data.company.position" type="text" class="form-control" placeholder="Jabatan">
              </div>
              <!-- address -->
              <div class="mb-2">
                <label for="inputCompanyAddress" class="form-label tw-self-center">Alamat</label>
                <input id="inputCompanyAddress" v-model="input.data.company.address" type="text" class="form-control" placeholder="Alamat">
              </div>
              <!-- email -->
              <div class="mb-2">
                <label for="inputCompanyEmail" class="form-label tw-self-center">Email</label>
                <input id="inputCompanyEmail" v-model="input.data.company.email" type="text" class="form-control" placeholder="Email">
              </div>
              <!-- phone -->
              <div class="mb-2">
                <label for="inputCompanyPhone" class="form-label tw-self-center">Nomor Telepon</label>
                <input id="inputCompanyPhone" v-model="input.data.company.phone" type="text" class="form-control" placeholder="Nomor Telepon">
              </div>
          </section>
        </form>
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
import { reactive, useContext, useStore } from '@nuxtjs/composition-api'
export default {
  layout: 'page',
  middleware: 'guest',
  transition: 'page',
  setup () {
    const store = useStore()
    const { redirect, $overlayLoading, $sleep } = useContext()
    const input = reactive({
      name: 'Alfian Dwi Nugraha',
      email: 'viandwicyber@gmail.com',
      phone: '087703211405',
      password: '12345',
      password_confirmation: '12345',
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

    return {
      input,
      register,
      goBack
    }
  }
}
</script>
