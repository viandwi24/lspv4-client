<template>
  <div class="collapsible_item">
    <div class="collapsible_item___header" @click="toggle">
      <div class="collapsible_item___header_icon">
        <font-awesome-icon :icon="collapse ? ['fas', 'chevron-right'] : ['fas', 'chevron-down']" />
      </div>
      <div class="collapsible_item___header_title">
        {{ title }}
      </div>
    </div>
    <div v-show="!collapse" class="collapsible_item___content">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const collapse = ref(!props.open)
    const toggle = () => {
      collapse.value = !collapse.value
    }

    return {
      collapse,
      toggle
    }
  },
})
</script>

