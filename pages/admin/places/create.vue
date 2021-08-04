<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{ text: 'Tempat Uji', link: '/admin/places' }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="goBack" />
      </div>
      <div class="ribbon">
        <h2>TEMPAT UJI</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center">
        <form class="my-4 p-4">
          <div class="mb-3">
            <label for="inputName" class="form-label">Nama</label>
            <input id="inputName" v-model="form.name" type="text" class="form-control" placeholder="Nama">
          </div>
          <div class="mb-3">
            <label for="inputAddress" class="form-label">Alamat</label>
            <textarea id="inputAddress" v-model="form.address" type="text" class="form-control" placeholder="Alamat" />
          </div>
          <div class="mb-3">
            <label for="inputPhone" class="form-label">Nomor Telephone</label>
            <input id="inputPhone" v-model="form.phone" type="text" class="form-control" placeholder="Nomor Telephone">
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
  reactive
} from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup (_props, { root }) {
    const goBack = () => root.$router.push('/admin/places')
    const form = reactive({
      name: '',
      address: '',
      phone: ''
    })
    const { save } = useCustomCrud(root, form, useCrud('/admin/places'), goBack)

    return {
      goBack,
      form,
      save
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
