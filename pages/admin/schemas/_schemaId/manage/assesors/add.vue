<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: backToSchemaManage},{text: 'Asesor', onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>ASESOR</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center xl">
        <form class="my-2 p-4">
          <div class="mb-3">
            <label for="inputTitle" class="form-label">Tambah Asesor Baru :</label>
            <v-select v-model="form.assesor_id" :options="assesors" :reduce="assesor => assesor.id" label="name" multiple />
          </div>
        </form>
      </div>
    </div>
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
        <Button text="SIMPAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="save" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { useSchemaFetch } from '@/api/schema.js'
import { useCrud } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { params, redirect, $overlayLoading } = useContext()
    const { schemaId } = params.value
    const backToSchemaManage = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage-assesors', params: { schemaId } })
    const { schema } = useSchemaFetch(back)
    const form = reactive({
      assesor_id: null
    })
    const assesors = ref([])
    const schemaAssesors = ref([])
    const crudPlace = useCrud('/admin/users')
    const crudSchemaAssesor = useCrud(`/admin/schemas/${schemaId}/assesors`)

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
        let res
        // asessors in this schema
        res = await crudSchemaAssesor.read()
        schemaAssesors.value = res.data.data

        // asessors
        res = await crudPlace.read({ filters: { role: 'Assessor' } })
        const r = res.data.data
        assesors.value = r.filter(p => !schemaAssesors.value.some(sp => sp.user_id === p.id))
      } catch (error) {
        back()
      }
      $overlayLoading.hide()
    })
    fetch()

    // actions
    const save = () => crudSchemaAssesor.create(form).then(() => back())

    return {
      back,
      backToSchemaManage,
      schema,
      form,
      save,
      assesors
    }
  }
}
</script>
