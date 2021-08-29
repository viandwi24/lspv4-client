<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Pengumuman" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>PENGUMUMAN</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-hidden">
      <Tabs>
        <Tab title="Asesi" class="tab__flex">
          <VueEditor id="editor_announcement_accession" v-model="form.announcement_accession" />
        </Tab>
        <Tab title="Asesor">
          <VueEditor id="editor_announcement_assessor" v-model="form.announcement_assessor" />
        </Tab>
      </Tabs>
    </div>
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
        <Button text="SIMPAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="save" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, useContext, useFetch } from "@nuxtjs/composition-api"
import { useCrud } from '@/api/crud.js'

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup() {
    const { redirect, $overlayLoading, $swal } = useContext()
    const back = () => redirect('/admin')
    const crud = useCrud('/admin/configs')
    
    const form = reactive({
      announcement_accession: '',
      announcement_assessor: ''
    })

    const { fetch } = useFetch(async function() {
        $overlayLoading.show()
        const response = await crud.read()
        const data = response.data.data
        form.announcement_accession = data.announcement_accession
        form.announcement_assessor = data.announcement_assessor
        $overlayLoading.hide()
    })
    fetch()

    // watch(schema, (val) => {
    //   form.announcement_accession = val.announcement_accession
    //   form.announcement_assessor = val.announcement_assessor
    // })

    // actions
    const save = () => {
        crud.http({
            method: 'PUT',
            url: crud.url,
            data: form
        }).then(() => {
            $swal({
                title: 'Berhasil',
                text: 'Data berhasil disimpan',
                icon: 'success'
            })
        })
    }

    return {
        back,
        save,
        form
    }
  }
})
</script>
