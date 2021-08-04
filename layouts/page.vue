<template>
  <div class="screen">
    <!-- overlay loading -->
    <OverlayLoading v-if="loading" />

    <!-- overlay profile -->
    <transition name="profileOverlay">
      <div v-if="profileOverlay && loggedIn" class="tw-fixed tw-z-50 tw-w-screen tw-h-screen flip-scale-2-hor-top">
        <div class="tw-relative tw-w-full tw-h-full">
          <div class="tw-bg-overlay tw-absolute tw-w-full tw-h-full" />
          <div class="tw-relative tw-w-full tw-h-full tw-z-50 tw-flex tw-flex-col tw-justify-center">
            <div class="tw-absolute tw-right-0 tw-top-0 tw-mt-4 tw-mr-4">
              <a href="#" class="tw-no-underline tw-transition tw-duration-200 tw-text-gray-50 hover:tw-text-red-500" @click.prevent="profileOverlay = !profileOverlay">
                <font-awesome-icon :icon="['fas', 'times']" class="tw-text-2xl" />
              </a>
            </div>
            <div class="container tw-text-center">
              <img class="tw-rounded-full tw-inline-block tw-shadow-lg tw-border-2 tw-border-gray-200 group-hover:tw-border-gray-400" :src="`https://ui-avatars.com/api/?name=${user.name}&size=128`" alt="Avatar">
              <div class="tw-text-gray-100 tw-mt-4">
                <div class="tw-text-2xl tw-font-bold">{{ user.name }}</div>
                <div class="tw-inline-block tw-text-sm tw-bg-gray-50 tw-text-gray-700 tw-rounded-lg tw-px-2 tw-py-1">
                  {{ user.email }}
                </div>
                <div class="tw-flex tw-justify-center tw-mt-2">
                  <Button text="Profil" :styles="[ 'big', 'blue' ]" :icon="['fas', 'id-card']" @click.native="logout" />
                  <Button text="Logout" :styles="[ 'big', 'yellow' ]" :icon="['fas', 'sign-out-alt']" @click.native="logout" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- screen -->
    <div class="screen-content">
      <div class="header">
        <div class="tw-flex-1" />
        <div class="tw-flex">
          <h1 class="tw-self-center tw-m-0 tw-p-0 tw-text-gray-100 title-super tw-text-3xl">
            LSP APP V4
          </h1>
        </div>
        <div class="tw-flex-1 tw-flex tw-flex-row tw-space-x-2 tw-justify-end">
          <div v-if="loggedIn" class="tw-flex-1 tw-text-right tw-flex tw-justify-end">
            <div class="tw-group tw-flex tw-self-center tw-rounded-xl tw-py-1 tw-px-2 tw-space-x-2 hover:tw-bg-gray-100 tw-transition-all tw-duration-200 tw-cursor-pointer" @click="profileOverlay = !profileOverlay">
              <div class="tw-self-center tw-font-semibold tw-hidden md:tw-block tw-overflow-ellipsis tw-truncate">
                <div class="tw-text-sm tw-text-gray-100 group-hover:tw-text-gray-700">
                  {{ user.name }}
                </div>
                <div class="tw-text-xs tw-text-gray-200 group-hover:tw-text-gray-600">
                  {{ user.email }}
                </div>
              </div>
              <img class="tw-rounded-full tw-shadow-lg tw-border-2 tw-border-gray-200 group-hover:tw-border-gray-400" :src="`https://ui-avatars.com/api/?name=${user.name}&size=46`" alt="Avatar">
            </div>
            <!-- <div class="tw-text-sm tw-text-gray-300">
              <span class="hover:tw-text-blue-400 hover:tw-underline tw-cursor-pointer" @click="logout">
                Logout
              </span>
            </div> -->
          </div>
        </div>
      </div>
      <Nuxt />
      <div class="footer">
        <div class="tw-text-gray-200">
          D-IT Soft
          &copy; 2021
          <a href="#" class="text-link">LSP APP</a>
        </div>
        <div class="text-center">
          <nav>
            <a href="#">TENTANG</a>
            <a href="#">TERMS OF SERVICE</a>
            <a href="#">CONTACT</a>
          </nav>
        </div>
        <div class="text-end tw-text-gray-200">
          <small>v4.0.1</small>
        </div>
      </div>
    </div>
    <!-- help panel -->
    <!-- <div class="tw-fixed tw-bottom-0 tw-right-0 tw-z-30 tw-flex tw-flex-col tw-justify-end tw-text-right">
      <HelpPanel v-show="helpPanelShow" />
      <div>
        <button
          tooltip:="'Tekan untuk membuka panel bantuan.'"
          class="tw-transition-all tw-ease-in tw-duration-200 tw-border tw-border-gray-100 tw-text-gray-50 tw-bg-red-500 tw-rounded-full hover:tw-bg-red-600 tw-mr-6 tw-mb-6"
          style="padding: .6rem 1rem;"
          @click="helpPanelShow = !helpPanelShow"
          @mouseover="helpPanelButtonTextShow = true"
          @mouseleave="helpPanelButtonTextShow = false"
        >
          <font-awesome-icon v-if="!helpPanelShow" :icon="['fas', 'question']" class="tw-mr-1" />
          <font-awesome-icon v-else :icon="['fas', 'times']" class="tw-mr-1" />
          <span v-show="helpPanelButtonTextShow" class="tw-transition-all tw-ease-in tw-duration-200">
            <span v-if="!helpPanelShow">Bantuan</span>
            <span v-else>Close</span>
          </span>
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  computed, ref, useContext
} from '@nuxtjs/composition-api'
export default {
  setup (_props, { root }) {
    const { store, redirect } = useContext()
    const loading = computed(() => root.$store.state.loading)
    const loggedIn = computed(() => store.state.auth.loggedIn)
    const user = computed(() => store.state.auth.user)
    const helpPanelShow = ref(false)
    const helpPanelButtonTextShow = ref(false)
    const profileOverlay = ref(false)

    const logout = () => {
      redirect('/auth/logout')
    }

    return {
      loading,
      logout,
      user,
      loggedIn,
      helpPanelShow,
      helpPanelButtonTextShow,
      profileOverlay
    }
  },
  head () {
    return {
      title: 'LSP APP V4'
    }
  }
}
</script>
