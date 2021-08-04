<template>
  <button class="btn-action" :class="`${buildStyle()}`" @click="clicked">
    <font-awesome-icon v-if="icon" :icon="icon" class="tw-ml-1 tw-mr-2" />
    <div>{{ text }}</div>
  </button>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: Array,
      default: undefined
    },
    styles: {
      type: Array,
      default: () => []
    },
    to: {
      type: Object,
      default: undefined
    }
  },
  setup (props) {
    // setup
    const { app: { router } } = useContext()

    // build
    const buildStyle = () => {
      let result = ''
      props.styles.forEach((e) => {
        result += `btn-${e} `
      })
      return result
    }

    const clicked = () => {
      if (props.to) {
        router.push(props.to)
      }
    }

    return {
      buildStyle,
      clicked
    }
  }
}
</script>
