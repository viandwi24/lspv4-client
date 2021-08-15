<template>
  <OverlayPage :is-loading="isLoading" title="ASESMEN MANDIRI & PERSETUJUAN ASESMEN DAN KERAHASIAAN" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button text="Buat Permohonan" :icon="['fas', 'paper-plane']" :styles="['big', 'blue']" @click.native="send" />
    </div>
    <!-- content -->
      <Collapsible>
        <CollapsibleItem title="FR. APL-02. ASESMEN MANDIRI">
          awe
        </CollapsibleItem>
        <CollapsibleItem title="FR-MAK-01. FORMULIR PERSETUJUAN ASESMEN DAN KERAHASIAAN">
          awe
        </CollapsibleItem>
      </Collapsible>
  </OverlayPage>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, { emit }) {
    const close = () => emit('close')
    const isLoading = ref(false)

    const form = ref({
      apl02: {
      },
      mak01: {

      },
    })

    return {
      close,
      isLoading,
      form
    }
  }
})
</script>
