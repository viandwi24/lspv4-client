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
        <form class="my-4">
          <div class="mb-3">
            <label for="inputName" class="form-label">Nama Lengkap</label>
            <input id="inputName" v-model="input.name" type="text" class="form-control" placeholder="Nama Lengkap" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <input id="inputEmail" v-model="input.email" type="email" class="form-control" placeholder="Email" autocomplete="off">
          </div>
          <div class="mb-3">
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
      password_confirmation: '12345'
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
