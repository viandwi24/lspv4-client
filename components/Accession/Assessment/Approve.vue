<template>
  <OverlayPage :is-loading="isLoading" title="ASESMEN MANDIRI PERSETUJUAN ASESMEN DAN KERAHASIAAN" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button text="Buat Permohonan" :icon="['fas', 'paper-plane']" :styles="['big', 'blue']" @click.native="send" />
    </div>
    <!-- content -->
    <div>hehe</div>
  </OverlayPage>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, { emit }) {
    const close = () => emit('close')
    const isLoading = ref(false)

    return {
      close,
      isLoading
    }
  }
})
</script>
