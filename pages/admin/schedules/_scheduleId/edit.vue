<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Edit" :data="[{text:'Jadwal',onclick: back},{text: ((schedule) ? schedule.name : '') }]" />
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
      <div class="container-center">
        <form class="my-4 p-4">
          <div class="mb-3">
            <label for="inputTitle" class="form-label">Judul</label>
            <input id="inputTitle" v-model="form.title" type="text" class="form-control" placeholder="Judul">
          </div>
          <div class="mb-3">
            <label for="inputTitle" class="form-label">Deskripsi</label>
            <textarea id="inputDescription" v-model="form.description" type="text" class="form-control" placeholder="Deskripsi" />
          </div>
          <div class="mb-3">
            <label for="inputDateStart" class="form-label">Tanggal Mulai</label>
            <input id="inputDateStart" v-model="form.date_start" type="date" class="form-control" placeholder="Tanggal">
          </div>
          <div class="mb-3">
            <label for="inputDateEnd" class="form-label">Tanggal Selesai</label>
            <input id="inputDateEnd" v-model="form.date_end" type="date" class="form-control" placeholder="Tanggal">
          </div>
          <div class="tw-text-center tw-text-gray-500">
            <span class="tw-text-xs">
              {{ form.date_start ? $moment(form.date_start).format('DD/MM/YYYY').toString() : '-' }}
            </span>
            sampai
            <span class="tw-text-xs">
              {{ form.date_end ? $moment(form.date_end).format('DD/MM/YYYY').toString() : '-' }}
            </span>
          </div>
        </form>
      </div>
    </div>
    <div class="tw-bg-gray-200 tw-px-4 tw-py-4 tw-flex tw-flex-row tw-justify-around">
      <div class="tw-flex tw-flex-col">
        <Button text="SIMPAN PERUBAHAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="beforeSave" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  useFetch,
  useContext,
  ref
} from '@nuxtjs/composition-api'
import { useCrud, inputOnly } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { params, $overlayLoading, $moment, redirect } = useContext()
    const { scheduleId } = params.value
    const back = () => redirect({ name: 'admin-schedules' })
    const form = reactive({
      title: '',
      description: '',
      date_start: '',
      date_end: ''
    })
    const schedule = ref(null)
    const { save, show } = useCustomCrud(form, useCrud(`/admin/schedules`), back)

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
        // form
        const result = await show(scheduleId)
        const data = result.data.data
        schedule.value = data
        inputOnly(form, data, ['title', 'description'])
        form.date_start = $moment(data.date_start).format('YYYY-MM-DD').toString()
        form.date_end = $moment(data.date_end).format('YYYY-MM-DD').toString()
      } catch (error) {
        back()
      }
      $overlayLoading.hide()
    })
    fetch()

    // bf
    const beforeSave = async () => {
      const id = params.value.scheduleId
      try {
        $overlayLoading.show()
        await save(id)
        back()
      } catch (error) {
      }
      $overlayLoading.hide()
    }

    // return
    return {
      back,
      schedule,
      form,
      beforeSave
    }
  }
}

function useCustomCrud (input, crud, back) {
  const save = (id) => {
    const data = input
    return crud.update(id, data)
  }

  const show = id => crud.show(id)

  return {
    save,
    show
  }
}
</script>
