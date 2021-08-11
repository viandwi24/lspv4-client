<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: backToSchemaManage},{text: 'File Persyaratan', onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>FILE PERSYARATAN</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center xl">
        <div class="form my-2 p-4">
          <div class="mb-3">
            <label for="inputName" class="form-label">Nama</label>
            <input id="inputName" v-model="form.name" type="text" class="form-control" placeholder="Nama">
          </div>
          <div class="mb-3">
            <label for="inputFormat" class="form-label">Format</label>
            <span class="tw-text-gray-500 tw-text-xs">*Kosongi jika ingin mengijinkan semua format</span>
            <v-select v-model="form.format" class="vue-select" :multiple="true" :options="formats" :reduce="e => e.code" />
          </div>
          <div class="form-check">
            <input id="inputRequired" v-model="form.required" class="form-check-input" type="checkbox">
            <label class="form-check-label" for="inputRequired">
              User Harus Mengupload File Ini
            </label>
          </div>
        </div>
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
import { reactive, useContext } from '@nuxtjs/composition-api'
import { useSchemaFetch } from '@/api/schema.js'
import { useCrud } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { params, redirect } = useContext()
    const { schemaId } = params.value
    const backToSchemaManage = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage-files', params: { schemaId } })
    const crudSchemaPlace = useCrud(`/admin/schemas/${schemaId}/files`)
    const { schema } = useSchemaFetch(back)
    const form = reactive({
      name: '',
      format: [],
      required: true,
    })
    const formats = reactive([
      { label: '.pdf', code: '.pdf' },
      { label: '.doc', code: '.doc' },
      { label: '.docx', code: '.docx' },
      { label: '.png', code: '.png' },
      { label: '.jpg', code: '.jpg' },
      { label: '.jpeg', code: '.jpeg' },
      { label: '.bmp', code: '.bmp' }
    ])

    // actions
    const save = () => crudSchemaPlace.create(form).then(() => back())

    return {
      back,
      backToSchemaManage,
      schema,
      form,
      save,
      formats,
    }
  }
}
</script>
