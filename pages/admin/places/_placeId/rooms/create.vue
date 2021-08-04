<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tambah" :data="[{text: 'Tempat Uji',link: '/admin/places'},{text: ((place) ? place.name : '') },{text: 'Ruangan', onclick: goBack}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="goBack" />
      </div>
      <div class="ribbon">
        <h2>RUANGAN</h2>
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
  setup () {
    const { params, redirect, $overlayLoading } = useContext()
    const { placeId } = params.value
    const goBack = () => redirect({ name: 'admin-places-placeId-rooms', params: { placeId } })
    const form = reactive({
      name: '',
      address: '',
      phone: ''
    })
    const crudPlace = useCrud('/admin/places')
    const { save } = useCustomCrud(form, useCrud(`/admin/places/${placeId}/rooms`), goBack)
    const place = ref(null)

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
        const result = await crudPlace.show(placeId)
        const data = result.data.data
        place.value = data
      } catch (error) {
        goBack()
      }
      $overlayLoading.hide()
    })
    fetch()

    return {
      goBack,
      form,
      place,
      save
    }
  }
}

function useCustomCrud (input, crud, goBack) {
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
