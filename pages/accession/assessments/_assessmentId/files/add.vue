<template>
  <div v-if="assessment" class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb
        page="Tambah"
        :data="[
          { text: 'Asesmen', link: '/accession/assessments' },
          { text: assessment.schema.title, link: `/accession/assessments/${assessment.id}` },
          { text: 'File', link: `/accession/assessments/${assessment.id}/files` }
        ]"
      />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>TAMBAH FILE</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center xl">
        <form class="my-2 p-4">
          <div class="mb-3">
            <label for="inputRequirementFile" class="form-label">Pilih Jenis File :</label>
            <v-select v-model="form.requirement_file_id" :options="filesRequired" :reduce="file => file.id" label="name" />
          </div>
          <div class="mb-3">
            <label for="inputUserFile" class="form-label">File Anda :</label>
            <v-select v-model="form.file_id" :options="files" :reduce="file => file.id" label="name" />
          </div>
        </form>
      </div>
    </div>
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
        <Button text="UPLOAD" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="upload" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, useFetch, reactive, useContext, ref } from '@nuxtjs/composition-api'
import { useAssessmentFetch } from '@/api/accession/assessment.js'
import { useCrud } from '@/api/crud.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { redirect, params, $overlayLoading, $swal } = useContext()
    const { assessmentId } = params.value
    const back = () => redirect({ name: 'accession-assessments-assessmentId-files' })
    const crud = useCrud(`/accession/assessments/${assessmentId}/files`)
    const crudFile = useCrud('/accession/files')
    const { assessment } = useAssessmentFetch()
    const files = ref([])
    const form = reactive({
      requirement_file_id: null
    })
    const requestFiles = computed(() => assessment.value.request.files)
    const filesRequired = computed(() => {
      const files = assessment.value.schema.requirement_files
      return files
    })

    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      const res = await crudFile.read()
      files.value = res.data.data
      $overlayLoading.hide()
    })
    fetch()

    //
    const upload = () => {
      $overlayLoading.show()
      crud.create(form, 'Yakin ingin menambahkan file ke asesmen ini?').then(e => {
        $swal({
          icon: 'success',
          title: 'Berhasil',
          text: 'File berhasil ditambahkan'
        })
        .then(() => back())
      }).finally(() => {
        $overlayLoading.hide()
      })
    }

    return {
      back,
      assessment,
      form,
      filesRequired,
      requestFiles,
      files,
      upload,
    }
  }
}
</script>
