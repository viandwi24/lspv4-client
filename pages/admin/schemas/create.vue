<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{ text: 'Skema', link: '/admin/schemas' }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="goBack" />
      </div>
      <div class="ribbon">
        <h2>SKEMA</h2>
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
            <v-select v-model="form.admin_id" :options="admins" :reduce="user => user.id" label="name" placeholder="Admin" />
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
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
        <Button text="SIMPAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="save" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive, ref, useContext, useFetch
} from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup (_props, { root }) {
    const { $overlayLoading, $axios } = useContext()
    const goBack = () => root.$router.push('/admin/schemas')
    const form = reactive({
      admin_id: '',
      title: '',
      code: '',
      description: '',
      status: 'Active'
    })
    const { save } = useCustomCrud(root, form, useCrud('/admin/schemas'), goBack)
    const selects = {
      status: {
        Aktif: 'Active',
        'Tidak Aktif': 'Nonactive'
      }
    }
    const admins = ref([])

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
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
        goBack()
      }
      $overlayLoading.hide()
    })
    fetch()

    return {
      goBack,
      form,
      save,
      selects,
      admins
    }
  }
}

function useCustomCrud (_root, input, crud, goBack) {
  const save = () => {
    const data = input
    crud.create(data).then(() => {
      goBack()
    })
  }

  return {
    save
  }
}
</script>
