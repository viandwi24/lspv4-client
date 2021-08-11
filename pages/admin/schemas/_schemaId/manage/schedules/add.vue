<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: backToSchemaManage},{text: 'Jadwal', onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>JADWAL</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center xl">
        <form class="my-2 p-4">
          <div class="mb-3">
            <label for="inputTitle" class="form-label">Tambah Jadwal Baru :</label>
            <v-select v-model="form.schedule_id" :options="schedules" :reduce="schedule => schedule.id" label="title" multiple />
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
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage-schedules', params: { schemaId } })
    const { schema } = useSchemaFetch(back)
    const form = reactive({
      schedule_id: null
    })
    const schedules = ref([])
    const schemaSchedules = ref([])
    const crudSchedule = useCrud('/admin/schedules')
    const crudSchemaSchedule = useCrud(`/admin/schemas/${schemaId}/schedules`)

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
        let res
        // asessors in this schema
        res = await crudSchemaSchedule.read()
        schemaSchedules.value = res.data.data

        // asessors
        res = await crudSchedule.read()
        const r = res.data.data
        schedules.value = r.filter(p => !schemaSchedules.value.some(sp => sp.schedule_id === p.id))
      } catch (error) {
        back()
      }
      $overlayLoading.hide()
    })
    fetch()

    // actions
    const save = () => crudSchemaSchedule.create(form).then(() => back())

    return {
      back,
      backToSchemaManage,
      schema,
      form,
      save,
      schedules
    }
  }
}
</script>
