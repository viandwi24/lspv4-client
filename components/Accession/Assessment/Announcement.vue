<template>
  <OverlayPage :is-loading="false" title="PENGUMUMAN" @close="close">
    <div v-html="assessment.schema.announcement_accession" />
  </OverlayPage>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
// import { useCrud } from '@/api/crud'

export default defineComponent({
  props: {
    assessment: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // const {} = useContext()
    const close = () => emit('close')

    return {
      close,
    }
  },
})
</script>
