<template>
  <OverlayPage :is-loading="isLoading" title="TAMBAHKAN ASESOR SEKALIGUS" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button text="Tambahkan" :icon="['fas', 'times']" :styles="['big', 'blue']" @click.native="add" />
    </div>

    <!-- content -->
    <div class="tw-mb-8">
      <div v-if="assessors" class="tw-mb-8">
        <Tabs class="tw-mb-8">
          <Tab title="Skema yang dipilih" class="tab__flex tw-shadow-lg">
            <div v-for="(schema, i) in schemas" :key="i">
              {{ i+1 }}. {{ schema.code }} - {{ schema.title }}
            </div>
          </Tab>
        </Tabs>
        <Tabs class="tw-mb-8">
          <Tab title="Pilih Asesor" class="tab__flex tw-shadow-lg">
            <div class="form">
              <div class="mb-3">
                <label for="inputTitle" class="form-label">Tambah Asesor Baru :</label>
                <v-select v-model="form.assessor_id" :options="assessors" :reduce="assessor => assessor.id" label="name" multiple />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  </OverlayPage>
</template>

<script>
import { defineComponent, reactive, ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud.js'

export default defineComponent({
  props: {
    schemas: {
      type: Array,
      required: true
    }
  },
  setup(_props, { emit }) {
    const { $overlayLoading, $swal } = useContext()
    const crudSchemaAssessor = useCrud(`/admin/schemas/bulk-add-assessor`)
    const crudAssessor = useCrud('/admin/users')
    const isLoading = ref(false)
    const close = () => emit('close')
    const assessors = ref(null)
    const form = reactive({
      assessor_id: null,
      schema_id: _props.schemas.map(schema => schema.id)
    })

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
        // assessors
        const res = await crudAssessor.read({ filters: { role: 'Assessor' } })
        assessors.value = res.data.data
        // assessors.value = r.filter(p => !schemaAssesors.value.some(sp => sp.user_id === p.id))
      } catch (error) {
        close()
      }
      $overlayLoading.hide()
    })
    fetch()


    // 
    const add = () => {
      crudSchemaAssessor.create(form).then(() => {
        $swal({
          title: 'Berhasil',
          text: 'Asesor berhasil ditambahkan',
          icon: 'success'
        }).then(m => {
          if (m.isConfirmed) {
            close()
          }
        })
      })
    }

    return {
      isLoading,
      close,
      add,
      form,
      assessors
    }
  },
})
</script>
