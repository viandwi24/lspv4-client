<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Edit" :data="[{text: 'Tempat Uji',link: '/admin/places'},{text: ((place) ? place.name : '') },{text: 'Ruangan', onclick: goBack},{text: (room) ? room.name : ''}]" />
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
    const { params, redirect, $overlayLoading } = useContext()
    const { placeId, roomId } = params.value
    const goBack = () => redirect({ name: 'admin-places-placeId-rooms', params: { placeId } })
    const form = reactive({
      name: '',
      address: '',
      phone: ''
    })
    const place = ref(null)
    const room = ref(null)
    const crudPlace = useCrud('/admin/places')
    const { show, save } = useCustomCrud(form, useCrud(`/admin/places/${placeId}/rooms`), goBack)

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
        let result, data
        result = await crudPlace.show(placeId)
        data = result.data.data
        place.value = data
        result = await show(roomId)
        data = result.data.data
        room.value = data
        inputOnly(form, data, ['name'])
      } catch (error) {
        goBack()
      }
      $overlayLoading.hide()
    })
    fetch()

    // bf
    const beforeSave = async () => {
      try {
        $overlayLoading.show()
        await save(roomId)
        goBack()
      } catch (error) {
      }
      $overlayLoading.hide()
    }

    // return
    return {
      goBack,
      placeId,
      form,
      place,
      room,
      beforeSave
    }
  }
}

function useCustomCrud (input, crud, goBack) {
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
