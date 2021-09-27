<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb v-if="assessment" page="FR. AI-01" :data="[{ text: 'Asesmen', link: '/assessor/assessments' }, { text: assessment.schema.title, link: `/assessor/assessments/${assessment.id}` }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>FR. AI-01</h2>
      </div>
      <div />
    </div>
    <div class="tw-flex-1 tw-max-h-full tw-overflow-hidden tw-flex tw-p-4">
      <div class="tw-flex-1 tw-flex-col tw-max-h-full tw-overflow-y-auto tw-rounded-lg tw-p-4 tw-bg-gray-100">
        <template v-for="unit in unitCompetencies">
          <div :key="`unit-${unit.id}`">
            <table class="table table-bordered p-0 m-0">
              <tbody>
                <tr style="background: rgba(229, 231, 235);">
                  <th>Unit Kompetensi</th>
                  <td> : {{ unit.title }}</td>
                </tr>
              </tbody>
            </table>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th width="20%">Elemen</th>
                  <th width="35%">Kriteria</th>
                  <th>Benchmark</th>
                  <th>Kompeten</th>
                  <th width="20%">Catatan</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(element, j) in unit.work_elements">
                  <template v-for="(job, k) in element.job_criterias">
                    <tr :key="`elemen-${j}-job-${k}`">
                      <td>{{ element.title }}</td>
                      <td>{{ job.title }}</td>
                      <td>{{ job.frai01.benchmark }}</td>
                      <td>
                        <!-- check if competent -->
                        <input v-model="form[job.frai01.id].competent" type="checkbox" />
                      </td>
                      <td>
                        <!-- check if competent -->
                        <input v-model="form[job.frai01.id].note" type="text" class="form-control" />
                      </td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </template>
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
import { defineComponent, onMounted, reactive, useContext, useFetch } from '@nuxtjs/composition-api'
import { useAssessmentFetch } from '@/api/assessor/assessment.js'
import { useCrud } from '@/api/crud.js'

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_assessor'],
  transition: 'page',
  setup (_, { refs }) {
    const { redirect, params, $overlayLoading, $swal, $axios } = useContext()
    const { assessmentId } = params.value
    const back = () => redirect({ name: 'assessor-assessments-assessmentId' })
    const crud = useCrud(`/assessor/assessments/${assessmentId}/frai01`)
    const { assessment, fetchAssessment } = useAssessmentFetch()
    const unitCompetencies = reactive([])
    const form = reactive({})

    // fetch
    const { fetch: fetchFrai01 } = useFetch(async () => {
      $overlayLoading.show()
      try {
        const res = await crud.read()
        // clear
        unitCompetencies.splice(0, unitCompetencies.length)
        Object.keys(form).forEach(key => {
          delete form[key]
        })
        // push new data
        unitCompetencies.push(...res.data.data)
        unitCompetencies.forEach((unit, i) => {
          unit.work_elements.forEach((element, j) => {
            element.job_criterias.forEach((job, k) => {
              form[job.frai01.id] = job.frai01
            })
          })
        })
      } catch (error) {
      }
    })

    // lifecycle
    onMounted(() => {
      fetchAssessment()
      fetchFrai01()
    })

    // methods
    const save = () => {
      $swal({
        title: 'Apakah kamu yakin?',
        text: 'Akan Menyimpan Checklist.',
        icon: 'question',
        showCancelButton: true,
        allowOutsideClick: false
      }).then((m) => {
        if (m.isConfirmed) {
          $overlayLoading.show()
          $axios({
            method: 'PUT',
            url: `/assessor/assessments/${assessmentId}/frai01`,
            data: {
              frai01: form
            }
          }).then((res) => {
            back()
          }).finally(() => {
            $overlayLoading.hide()
          })
        }
      })
    }

    return {
      back,
      assessment,
      save,
      form,
      unitCompetencies
    }
  }
})
</script>
