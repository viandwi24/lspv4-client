<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Informasi Skema" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>INFORMASI SKEMA</h2>
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
            <label for="inputCode" class="form-label">Kode</label>
            <input id="inputCode" v-model="form.code" type="text" class="form-control" placeholder="Kode">
          </div>
          <div class="mb-3">
            <label for="inputTitle" class="form-label">Deskripsi</label>
            <textarea id="inputDescription" v-model="form.description" type="text" class="form-control" placeholder="Deskripsi" />
          </div>
          <div class="mb-3">
            <label for="inputStatus" class="form-label">Admin</label>
            <v-select v-model="form.admin_id" :reduce="user => user.id" :options="admins" label="name" />
          </div>
          <div class="mb-3">
            <label for="inputStatus" class="form-label">Status</label>
            <select id="input-Status" v-model="form.status" name="Status" class="form-control">
              <option v-for="(item, i) in selects.status" :key="i" :value="item">
                {{ i }}
              </option>
            </select>
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
  setup (_props, { root }) {
    const { params, $overlayLoading, $axios, redirect } = useContext()
    const { schemaId } = params.value
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const form = reactive({
      admin_id: '',
      title: '',
      code: '',
      description: '',
      status: 'Active'
    })
    const { save, show } = useCustomCrud(root, form, useCrud('/admin/schemas'), back)
    const selects = {
      status: {
        Aktif: 'Active',
        'Tidak Aktif': 'Nonactive'
      }
    }
    const schema = ref(null)
    const admins = ref([])

    // fecth
    const { fetch } = useFetch(async () => {
      const id = params.value.schemaId
      $overlayLoading.show()
      try {
        // form
        const result = await show(id)
        const data = result.data.data
        schema.value = data
        inputOnly(form, data, ['admin_id', 'title', 'code', 'description', 'status'])

        // get admin users
        await $axios({
          method: 'get',
          url: '/admin/users',
          params: {
            filters: {
              role: 'Admin'
            }
          }
        }).then((res) => {
          admins.value = res.data.data
        })
      } catch (error) {
        back()
      }
      $overlayLoading.hide()
    })
    fetch()

    // bf
    const beforeSave = async () => {
      const id = params.value.schemaId
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
      form,
      beforeSave,
      selects,
      admins,
      schema
    }
  }
}

function useCustomCrud (_root, input, crud, back) {
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
