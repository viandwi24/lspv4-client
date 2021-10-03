<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb v-if="assessment" page="FR. AI-02" :data="[{ text: 'Asesmen', link: '/assessor/assessments' }, { text: assessment.schema.title, link: `/assessor/assessments/${assessment.id}` }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>FR. AI-02</h2>
      </div>
      <div />
    </div>
    <div class="tw-flex-1 tw-max-h-full tw-overflow-hidden tw-flex tw-p-4">
      <div class="tw-flex-1 tw-flex-col tw-max-h-full tw-overflow-y-auto tw-rounded-lg tw-p-4 tw-bg-gray-50">
        <form class="">
          <div class="mb-3">
            <label for="inputStatus">Pengetahuan Kandidat adalah :</label>
            <select id="inputStatus" v-model="form.good" class="form-control">
              <option value="true">Memuaskan</option>
              <option value="false">Tidak Memuaskan</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="inputFeedback">Tanggapan :</label>
            <textarea id="inputFeedback" v-model="form.feedback" class="form-control" />
          </div>
        </form>
        <div v-for="(unit, i) in form.items" :key="i" class="mb-4">
          <div>
            <span>{{ unit.title }}</span>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th width="4%">#</th>
                <th>Pertanyaan</th>
                <th width="6%">Memuaskan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, j) in unit.frai02" :key="j">
                <td>{{ j + 1 }}</td>
                <td>
                  <div>
                    <div class="tw-font-bold">
                      Pertanyaan :
                    </div>
                    {{ item.frai02.question }}
                  </div>
                  <div>
                    <div class="tw-font-bold">
                      Tanggapan :
                    </div>
                    <input v-model="form.items[i].frai02[j].answer" type="text" class="form-control form-control-sm" placeholder="Isi Tanggapan Asesi...">
                  </div>
                </td>
                <td>
                  <div class="form-check">
                    <input :id="`check-${i}-${j}`" v-model="form.items[i].frai02[j].good" class="form-check-input" type="checkbox">
                    <label class="form-check-label" :for="`check-${i}-${j}`"></label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
    const crud = useCrud(`/assessor/assessments/${assessmentId}/frai02`)
    const { assessment, fetchAssessment } = useAssessmentFetch()
    const form = reactive({
      good: true,
      feedback: '',
      items: []
    })

    // fetch
    const { fetch: fetchFrai02 } = useFetch(async () => {
      $overlayLoading.show()
      try {
        const res = await crud.read()
        const data = res.data.data
        form.good = data.good
        form.feedback = data.feedback
        form.items.slice(0, form.items.length)
        data.items.forEach(item => form.items.push(item))
      } catch (error) {
      }
    })

    // methods
    const save = () => {
      const data = { ...form }
      data.good = (form.good === 'true' || form.good === true) ? 1 : 0
      $swal({
        title: 'Apakah kamu yakin?',
        text: 'Akan Menyimpan Tanggapan.',
        icon: 'question',
        showCancelButton: true,
        allowOutsideClick: false
      }).then((m) => {
        if (m.isConfirmed) {
          $overlayLoading.show()
          $axios({
            method: 'PUT',
            url: `/assessor/assessments/${assessmentId}/frai02`,
            data
          }).then((res) => {
            back()
          }).finally(() => {
            $overlayLoading.hide()
          })
        }
      })
    }

    onMounted(() => {
      fetchAssessment()
      fetchFrai02()
    })

    return {
      back,
      assessment,
      assessmentId,
      form,
      save
    }
  }
})
</script>
