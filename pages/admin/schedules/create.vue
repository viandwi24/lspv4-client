<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{text:'Jadwal',onclick: back}]" />
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
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
        <Button text="SIMPAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="save" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive, useContext
} from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { params, redirect } = useContext()
    const { schemaId } = params.value
    const back = () => redirect({ name: 'admin-schedules', params: { schemaId } })
    const form = reactive({
      title: '',
      description: '',
      date_start: '',
      date_end: ''
    })
    const { save } = useCustomCrud(form, useCrud(`/admin/schedules`), back)

    return {
      back,
      form,
      save
    }
  }
}

function useCustomCrud (input, crud, back) {
  const save = () => {
    const data = input
    crud.create(data).then(() => {
      back()
    })
  }

  return {
    save
  }
}
</script>
