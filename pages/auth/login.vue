<template>
  <div class="content panel panel-center">
    <div class="panel-center-content">
      <div class="panel-title">
        <div class="ribbon">
          <h2>MASUK</h2>
        </div>
      </div>
      <div class="container-center tw-px-6">
        <form class="my-4">
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <input id="inputEmail" v-model="input.email" type="email" class="form-control" placeholder="Email" autocomplete="off">
          </div>
          <div class="mb-4">
            <label for="inputPassword" class="form-label">Password</label>
            <input id="inputPassword" v-model="input.password" type="password" class="form-control" placeholder="Password" autocomplete="off">
          </div>
          <div class="tw-flex tw-flex-col">
            <Button text="MASUK" :styles="[ 'big', 'blue' ]" :icon="['fas', 'sign-in-alt']" @click.native.prevent="login" />
            <Button text="KEMBALI" :styles="[ 'big', 'yellow' ]" :icon="['fas', 'arrow-left']" @click.native.prevent="goBack" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, useContext } from '@nuxtjs/composition-api'
export default {
  layout: 'page',
  middleware: 'guest',
  transition: 'page',
  setup () {
    const { redirect, $overlayLoading, $auth, $sleep, $swal } = useContext()
    const input = reactive({
      email: '',
      password: ''
      // email: 'admin@mail.com',
      // password: 'admin'
      // email: 'viandwicyber@gmail.com',
      // password: '12345'
    })

    const goBack = () => {
      redirect('/')
    }

    const login = () => {
      console.log('clicked login')
      const data = input
      $overlayLoading.show()
      $auth.login(data).then(async () => {
        await $sleep(1000)
        if ($auth.loggedIn) redirect({ name: 'dashboard' })
      }).catch(() => {
        console.log($auth)
        $swal({
          icon: 'error',
          title: 'Gagal',
          text: 'Cek Kombinasi Email dan Password atau Apakah Akun Tersebut Ada.'
        })
      })
      .finally(() => $overlayLoading.hide())
      // store.dispatch('user/login', data).then(() => {
      //   console.log('berhasil')
      //   // await sleep(1000)
      //   // redirect({ name: 'dashboard' })
      // }).catch(() => {
      //   alert('Login gagal, cek kombinasi email dan password.')
      // })
      // .finally(() => {
      //   if ($auth.user.name) redirect({ name: 'dashboard' })
      //   $overlayLoading.hide()
      // })
    }

    return {
      input,
      login,
      goBack
    }
  }
}
</script>
