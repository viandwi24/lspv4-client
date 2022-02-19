<template>
  <div v-if="assessment" class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Keputusan" :data="[{ text: 'Asesmen', link: '/assessor/assessments' }, { text: assessment.schema.title, link: `/assessor/assessments/${assessment.id}` }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>UBAH KEPUTUSAN</h2>
      </div>
      <div class="tw-flex tw-flex-col justify-center items-center mt-3">
        <div class="tw-hidden tw-relative tw-rounded-lg tw-px-4 tw-py-3 md:tw-flex tw-space-x-3 tw-bg-purple-100">
          <div class="tw-text-purple-500 tw-right-0 tw-bottom-0 tw-text-3xl tw-flex">
            <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" class="tw-self-center" />
          </div>
          <div>
            <div class="tw-text tw-font-semibold">Asesi</div>
            <div class="tw-text-sm tw-text-gray-500">{{ assessment.accession.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-y-auto">
      <div class="container-center xl">
        <form class="my-2 p-4">
          <div class="mb-3">
            <label for="inputStatus">Keputusan :</label>
            <select id="inputStatus" v-model="form.status" class="form-control">
              <option value="null">Belum Diputuskan</option>
              <option value="Competent">Kompeten</option>
              <option value="Incompetent">Belum Kompeten</option>
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
import { defineComponent, reactive, useContext, watch } from '@nuxtjs/composition-api'
// import { useCrud } from '@/api/crud.js'
import { useAssessmentFetch } from '@/api/assessor/assessment.js'

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_assessor'],
  transition: 'page',
  setup (_, { refs }) {
    const { redirect, params, $overlayLoading, $swal, $axios } = useContext()
    const { assessmentId } = params.value
    const back = () => redirect({ name: 'assessor-assessments-assessmentId' })
    // const crudAssessment = useCrud('/assessor/assessments')
    // const assessment = ref(null)
    const { assessment } = useAssessmentFetch()
    const form = reactive({
      status: ''
    })

    // wathcers
    watch(assessment, () => {
      if (assessment) {
        form.status = (assessment.value.status) ? assessment.value.status : 'null'
      }
    })

    // fetch
    // const { fetch } = useFetch(async () => {
    //   $overlayLoading.show()
    //   try {
    //     // form
    //     const result = await crudAssessment.show(assessmentId)
    //     const data = result.data.data
    //     assessment.value = data
    //     form.status = (assessment.value.status) ? assessment.value.status : 'null'
    //   } catch (error) {
    //     back()
    //   }
    //   $overlayLoading.hide()
    // })
    // fetch()

    const save = () => {
      $swal({
        title: 'Apakah kamu yakin?',
        text: 'Akan Mengubah status keputusan asesi.',
        icon: 'question',
        showCancelButton: true,
        allowOutsideClick: false
      }).then((m) => {
        if (m.isConfirmed) {
          $overlayLoading.show()
          $axios({
            method: 'POST',
            url: `/assessor/assessments/${assessmentId}/change-status`,
            data: form
          }).then(() => {
            back()
          }).finally(() => {
            $overlayLoading.hide()
            close()
          })
        }
      })
    }

    return {
      back,
      assessment,
      form,
      save,
    }
  }
})
</script>
