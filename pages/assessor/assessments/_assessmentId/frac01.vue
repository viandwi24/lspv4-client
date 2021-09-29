<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb v-if="assessment" page="FR. AC-01" :data="[{ text: 'Asesmen', link: '/assessor/assessments' }, { text: assessment.schema.title, link: `/assessor/assessments/${assessment.id}` }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>FR. AC-01</h2>
      </div>
      <div />
    </div>
    <div class="tw-flex-1 tw-max-h-full tw-overflow-hidden tw-flex tw-p-4">
      <div class="tw-flex-1 tw-flex-col tw-max-h-full tw-overflow-y-auto tw-rounded-lg tw-p-4 tw-bg-gray-50">
        <form class="">
          <div class="mb-3">
            <label for="inputStatus">Keputusan :</label>
            <select id="inputStatus" v-model="form.status" class="form-control">
              <option value="null">Belum Diputuskan</option>
              <option value="Competent">Kompeten</option>
              <option value="Incompetent">Belum Kompeten</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="inputNextStep">Tindak Lanjut :</label>
            <textarea id="inputNextStep" v-model="form.next_step" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="inputNote">Komentar / Observasi Oleh Asesor :</label>
            <textarea id="inputNote" v-model="form.note" class="form-control" />
          </div>
        </form>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th width="4%">#</th>
              <th width="30%">Unit Kompetensi</th>
              <th v-for="(evidence, j) in evidences" :key="j">
                {{ evidence.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, i) in unitCompetencies" :key="i">
              <td>{{ i+1 }}</td>
              <td>
                {{ unit.code }} - {{ unit.title }}
              </td>
              <td v-for="(evidence, j) in evidences" :key="j">
                <div class="form-check">
                  <input :id="`check-${i}-0`" v-model="form.items[unit.frac01.id].evidence" class="form-check-input" type="checkbox" :value="evidence.value">
                  <label class="form-check-label" :for="`check-${i}-0`" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
    const crud = useCrud(`/assessor/assessments/${assessmentId}/frac01`)
    const { assessment, fetchAssessment } = useAssessmentFetch()
    const unitCompetencies = reactive([])
    const form = reactive({
      status: null,
      next_step: '',
      note: '',
      items: {},
    })
    const evidences = [
      { text: 'Observasi Demonstrasi', value: 'demonstration_observation' },
      { text: 'Portofolio', value: 'portfolio' },
      { text: 'Pernyataan pihak ketiga', value: 'third_party_statement' },
      { text: 'Pertanyaan Lisan', value: 'oral_question' },
      { text: 'Pertanyaan Tertulis', value: 'written_question' },
      { text: 'Proyek Kerja', value: 'work_project' },
      { text: 'Lainnya', value: 'other' },
    ]

    // fetch
    const { fetch: fetchFrac01 } = useFetch(async () => {
      $overlayLoading.show()
      try {
        const res = await crud.read()
        const data = res.data.data
        form.status = data.status
        form.next_step = data.next_step
        form.note = data.note
        // clear
        unitCompetencies.splice(0, unitCompetencies.length)
        Object.keys(form.items).forEach(key => {
          delete form.items[key]
        })
        // push new data
        unitCompetencies.push(...data.items)
        unitCompetencies.forEach((unit, i) => {
          form.items[unit.frac01.id] = unit.frac01
        })
      } catch (error) {
        console.log(error)
      }
    })

    // lifecycle
    onMounted(() => {
      fetchAssessment()
      fetchFrac01()
    })

    // methods
    const save = () => {
      const data = { ...form }
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
            url: `/assessor/assessments/${assessmentId}/frac01`,
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
      unitCompetencies,
      evidences
    }
  }
})
</script>
