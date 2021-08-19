<template>
  <OverlayPage :is-loading="false" title="CETAK BERITA ACARA" @close="close">
    <!-- footer button -->
    <Button
      text="Cetak"
      :styles="[ 'big', 'blue' ]"
      :href="`${$axios.defaults.baseURL}/admin/schemas/${schemaId}/pdf?document=list_of_attendees&${convertFiltersToQuery(props.filters)}&token=${$auth.getToken()}`"
      target="_blank"
    />

    <!-- content -->
    <Tabs class="tw-mb-8">
      <Tab title="Opsi Cetak" class="tab__flex tw-shadow-lg">
        <div class="form">
          <!-- name -->
          <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
            <div class="tw-w-full md:tw-w-1/6 tw-flex">
              <label for="inputAuto" class="form-label tw-self-center">Isi Otomatis</label>
            </div>
            <div class="tw-w-full md:tw-w-5/6">
              <select id="inputAuto" class="form-control">
                <option value="true">Iya</option>
                <option value="false">Tidak</option>
              </select>
              <div class="tw-text-gray-500">
                * Jika Diaktifkan, Maka akan Otomatis mengisi tanggal berdasarkan jadwal, otomatis mengisi tanda tangan asesi, dan otomatis mengisi Tempat Uji.
              </div>
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>
  </OverlayPage>
</template>


<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup (_props, { emit }) {
    const { params } = useContext()
    const { schemaId } = params.value
    const close = () => emit('close')

    return {
      close,
      schemaId
    }
  }
})
</script>
