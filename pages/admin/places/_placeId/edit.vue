<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Edit" :data="[{text: 'Tempat Uji',link: '/admin/places'},{text: ((place) ? place.name : '') }]" />
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
    const { params, $overlayLoading } = useContext()
    const goBack = () => root.$router.push('/admin/places')
    const form = reactive({
      name: '',
      address: '',
      phone: ''
    })
    const place = ref(null)
    const { save, show } = useCustomCrud(root, form, useCrud('/admin/places'), goBack)

    // fecth
    const { fetch } = useFetch(async () => {
      const id = params.value.placeId
      $overlayLoading.show()
      try {
        const result = await show(id)
        const data = result.data.data
        place.value = data
        inputOnly(form, data, ['name', 'address', 'phone'])
      } catch (error) {
        goBack()
      }
      $overlayLoading.hide()
    })
    fetch()

    // bf
    const beforeSave = async () => {
      const id = params.value.placeId
      try {
        $overlayLoading.show()
        await save(id)
        goBack()
      } catch (error) {
      }
      $overlayLoading.hide()
    }

    // return
    return {
      goBack,
      form,
      place,
      beforeSave
    }
  }
}

function useCustomCrud (_root, input, crud, goBack) {
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
