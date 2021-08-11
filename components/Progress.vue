<template>
  <div class="tw-relative tw-pt-1">
    <div class="tw-flex tw-mb-2 tw-items-center tw-justify-between">
      <div>
        <span class="tw-text-xs tw-font-semibold tw-inline-block tw-py-1 tw-px-2 tw-uppercase tw-rounded-full tw-text-pink-600 tw-bg-pink-200">
          Progres Asesmen Anda
        </span>
      </div>
      <div class="tw-text-right">
        <span class="tw-text-xs tw-font-semibold tw-inline-block tw-text-pink-600">
          {{ value }}%
        </span>
      </div>
    </div>
    <div class="tw-overflow-hidden tw-h-2 tw-mb-4 tw-text-xs tw-flex tw-rounded tw-bg-pink-200">
      <div :style="{ width: `${value}%` }" class="tw-shadow-none tw-flex tw-flex-col tw-text-center tw-whitespace-nowrap tw-text-white tw-justify-center tw-bg-pink-500"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }) {
    return {}
  },
})
</script>
