<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: backToSchemaManage},{text: 'Tempat Uji', onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>TEMPAT UJI</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center xl">
        <form class="my-2 p-4">
          <div class="mb-3">
            <label for="inputTitle" class="form-label">Tambah Tempat Uji Baru :</label>
            <v-select v-model="form.place_id" :options="places" :reduce="place => place.id" label="name" multiple />
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
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage-places', params: { schemaId } })
    const { schema } = useSchemaFetch(back)
    const form = reactive({
      place_id: null
    })
    const places = ref([])
    const schemaPlaces = ref([])
    const crudPlace = useCrud('/admin/places')
    const crudSchemaPlace = useCrud(`/admin/schemas/${schemaId}/places`)

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
        let res
        // places in this schema
        res = await crudSchemaPlace.read()
        schemaPlaces.value = res.data.data

        // places
        res = await crudPlace.read()
        const r = res.data.data
        places.value = r.filter(p => !schemaPlaces.value.some(sp => sp.place_id === p.id))
      } catch (error) {
        back()
      }
      $overlayLoading.hide()
    })
    fetch()

    // actions
    const save = () => crudSchemaPlace.create(form).then(() => back())

    return {
      back,
      backToSchemaManage,
      schema,
      form,
      save,
      places
    }
  }
}
</script>
