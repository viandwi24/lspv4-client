<template>
  <div v-if="assessment" class="content panel tw-flex tw-flex-col">
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
    <div class="tw-flex-1 tw-max-h-full tw-overflow-hidden tw-flex tw-p-4">
      <div class="tw-flex-1 tw-flex-col tw-max-h-full tw-overflow-y-auto tw-rounded-lg tw-p-4 tw-bg-gray-50">
        <form class="">
          <div class="mb-3">
            <label for="inputStatus">Kinerja Kandidat :</label>
            <select id="inputStatus" v-model="form.good" class="form-control">
              <option value="true">Memuaskan</option>
              <option value="false">Tidak Memuaskan</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="inputFeedback">Umpan Balik :</label>
            <textarea id="inputFeedback" v-model="form.feedback" class="form-control" />
          </div>
        </form>
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
                        <input v-model="form.items[job.frai01.id].competent" type="checkbox" />
                      </td>
                      <td>
                        <!-- check if competent -->
                        <input v-model="form.items[job.frai01.id].note" type="text" class="form-control" />
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
    const form = reactive({
      items: {},
      good: true,
      feedback: ''
    })

    // fetch
    const { fetch: fetchFrai01 } = useFetch(async () => {
      $overlayLoading.show()
      try {
        const res = await crud.read()
        const data = res.data.data
        form.good = data.good
        form.feedback = data.feedback
        // clear
        unitCompetencies.splice(0, unitCompetencies.length)
        Object.keys(form.items).forEach(key => {
          delete form.items[key]
        })
        // push new data
        unitCompetencies.push(...data.items)
        unitCompetencies.forEach((unit, i) => {
          unit.work_elements.forEach((element, j) => {
            element.job_criterias.forEach((job, k) => {
              form.items[job.frai01.id] = job.frai01
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
      const data = { ...form }
      data.good = (form.good === 'true' || form.good === true) ? 1 : 0
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
            data
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
