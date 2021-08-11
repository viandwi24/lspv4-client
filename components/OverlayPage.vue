<template>
  <div class="tw-bg-overlay tw-fixed tw-w-screen tw-h-screen tw-left-0 tw-top-0 tw-z-50">
    <div class="tw-relative tw-flex tw-w-full tw-h-full tw-overflow-hidden">
      <div v-if="!isLoading" class="tw-container tw-flex tw-flex-col tw-mx-auto">
        <!-- header -->
        <div class="tw-flex tw-flex-row tw-bg-gray-50 tw-shadow tw-border tw-border-gray-400">
          <div class="tw-flex-1 tw-px-4 tw-py-2 tw-text-gray-700 tw-font-semibold">
            {{ title }}
          </div>
          <button class="tw-px-4" @click="close">
            <font-awesome-icon :icon="['fas', 'times']" class="tw-text-red-400 tw-transition tw-duration-200 hover:tw-text-red-700" />
          </button>
        </div>
        <!-- section -->
        <div class="tw-flex-1 tw-max-h-full tw-overflow-y-auto tw-bg-gray-200 tw-px-4 tw-py-4">
          <slot />
        </div>
        <!-- footer -->
        <div class="tw-flex tw-flex-row tw-justify-center tw-bg-gray-50 tw-shadow tw-px-4 tw-py-2 tw-border tw-border-gray-400">
          <slot name="footer-button" />
          <div class="tw-hidden md:tw-block">
            <Button text="Batal" :icon="['fas', 'times']" :styles="['big', 'yellow']" @click.native="close" />
          </div>
        </div>
      </div>
      <div v-else class="tw-container tw-flex tw-flex-col tw-mx-auto">
        <div class="tw-flex tw-flex-row tw-bg-gray-50 tw-shadow tw-border tw-border-gray-400">
          <div class="tw-flex-1 tw-px-4 tw-py-2 tw-text-gray-700 tw-font-semibold">
            Loading...
          </div>
        </div>
        <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-max-h-full tw-overflow-y-auto tw-bg-gray-200 tw-px-4 tw-py-4">
          <center>
            <font-awesome-icon :icon="['fas', 'circle-notch']" class="tw-text-gray-50 tw-text-8xl" spin />
          </center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    }
  },
  setup(_, { emit }) {
    const close = () => emit('close')
    return {
      close
    }
  },
})
</script>

