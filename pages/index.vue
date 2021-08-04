<template>
  <div class="content panel panel-center">
    <div class="tw-hidden sm:tw-block tw-absolute tw-bottom-0 tw-left-0 tw-ml-6 tw-mb-4 tw-bg-gray-700 tw-p-4 tw-text-gray-200 tw-rounded-xl tw-z-10">
      <div class="tw-text-3xl tw-font-bold">
        LSP SMKN 1 MOJOKERTO
      </div>
      <div>
        Lembaga Sertifikasi Profesi
      </div>
    </div>
    <div class="tw-flex tw-flex-1 sm:tw-flex-none tw-flex-col sm:tw-flex-row tw-justify-center tw-space-y-10 md:tw-space-y-0">
      <div class="tw-pl-10 tw-flex-1 tw-relative tw-hidden sm:tw-flex">
        <img src="img/illustrations/3255307.svg" alt="Avatar">
      </div>
      <div class="tw-block sm:tw-hidden tw-text-center tw-bg-gray-700 tw-text-gray-200 tw-rounded-xl tw-p-4 tw-mx-4">
        <div class="tw-text-2xl tw-font-bold">
          LSP SMKN 1 MOJOKERTO
        </div>
        <div>
          Lembaga Sertifikasi Profesi
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-flex-row tw-justify-center tw-px-0 sm:tw-pl-10 sm:tw-w-auto sm:tw-pr-10">
        <div class="tw-flex tw-flex-col sm:tw-flex-1 sm:tw-justify-center sm:tw-bg-gray-200 sm:tw-px-6 sm:tw-rounded">
          <div class="tw-flex tw-flex-col tw-justify-center tw-w-full" style="width: 300px;">
            <Button text="MASUK" :styles="[ 'big', 'blue' ]" :icon="['fas', 'sign-in-alt']" @click.native.prevent="login" />
            <Button text="DAFTAR" :styles="[ 'big', 'yellow' ]" :icon="['fas', 'user-plus']" @click.native.prevent="register" />
          </div>
          <div class="tw-text-center">
            <div class="tw-py-2 tw-text-gray-500 tw-flex tw-flex-col">
              <hr class="tw-mx-10">
            </div>
            <div class="tw-text-sm tw-mb-2 tw-text-gray-500">
              Atau masuk dengan
            </div>
            <button class="tw-transition-all tw-duration-200 tw-bg-gray-200 tw-border tw-border-gray-500 tw-rounded-full tw-px-3 tw-py-2 hover:tw-bg-gray-300 hover:tw-border-gray-700">
              <font-awesome-icon :icon="['fab', 'google']" />
            </button>
            <button class="tw-transition-all tw-duration-200 tw-text-gray-100 tw-bg-blue-500 tw-border tw-border-gray-200 tw-rounded-full tw-px-3 tw-py-2 hover:tw-bg-blue-600 hover:tw-border-gray-300">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </button>
            <button class="tw-transition-all tw-duration-200 tw-text-gray-100 tw-bg-gray-700 tw-border tw-border-gray-200 tw-rounded-full tw-px-3 tw-py-2 hover:tw-bg-gray-800 hover:tw-border-gray-300">
              <font-awesome-icon :icon="['fab', 'github']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
export default {
  layout: 'page',
  middleware: 'guest',
  transition: 'page',
  setup () {
    const { redirect } = useContext()

    const login = () => {
      redirect('/auth/login')
    }

    const register = () => {
      redirect('/auth/register')
    }

    return {
      login,
      register
    }
  }
}
</script>
