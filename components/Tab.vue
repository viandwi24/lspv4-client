<template lang="html">
  <div v-show="isActive" class="tab">
    <slot />
  </div>
</template>

<script>
export default {
  component: true,
  props: {
    title: {
      type: String,
      default: 'Tab'
    }
  },
  data () {
    return {
      isActive: true
    }
  }
}
</script>

<style lang="css">
</style>
