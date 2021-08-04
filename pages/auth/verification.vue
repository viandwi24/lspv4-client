<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>AKUN BELUM AKTIF</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center tw-px-2">
        <div>
          <img src="/img/illustrations/Authentication-rafiki.svg" alt="Illustration">
        </div>
        <div class="tw-text-center tw-mb-2 tw-px-6 tw-bg-yellow-100 tw-p-1 tw-border tw-border-yellow-500 tw-rounded">
          Akun anda belum aktif karena belum melakukan verifikasi melalui email. Silahkan cek email anda ({{ user.email }}) untuk melakukan verifikasi.
          Jika tidak menemukan di inbox, cek di kotak spam.
        </div>
        <div class="tw-text-center tw-mb-2 tw-px-6 tw-bg-green-100 tw-p-1 tw-border tw-border-green-500 tw-rounded">
          Masih belum menerima? <a href="">Klik disini</a> untuk mengirim ulang email verifikasi.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'page',
  middleware: 'auth',
  transition: 'page',
  setup () {
    const { redirect, $auth } = useContext()
    const back = () => redirect('/auth/logout')
    const user = computed(() => $auth.user)
    return {
      back,
      user
    }
  }
})
</script>
