<template>
  <OverlayPage :is-loading="isLoading" title="ASESMEN MANDIRI & PERSETUJUAN ASESMEN DAN KERAHASIAAN" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button text="Setujui dan Tanda Tangani" :icon="['fas', 'check']" :styles="['big', 'blue']" @click.native="send" />
    </div>
    <!-- content -->
    <Collapsible v-if="schema">
      <CollapsibleItem title="FR. APL-02. ASESMEN MANDIRI">
        <div class="tw-bg-blue-100 tw-border-t-4 tw-border-blue-500 tw-rounded-b tw-text-blue-900 tw-px-4 tw-py-3 tw-shadow-sm tw-mb-4" role="alert">
          <div>Intruksi :</div>
          <ul class="tw-list-outside tw-list-disc">
            <li>Baca setiap pertanyaan di kolom sebelah kiri</li>
            <li>Beri tanda centang (√) pada kotak jika Anda yakin dapat melakukan tugas yang dijelaskan.</li>
            <li>Isi kolom di sebelah kanan dengan mendaftar bukti yang Anda miliki untuk menunjukkan bahwa Anda melakukan tugas-tugas ini.</li>
          </ul>
        </div>
        <Collapsible v-for="(unit, i) in schema.competency_units" :key="i">
          <CollapsibleItem :title="`${unit.code} / ${unit.title}`">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th colspan="3">Kode / Judul Unit Kompetensi : {{ unit.code }} / {{ unit.title }}</th>
                </tr>
                <tr>
                  <th>Apakah saya dapat?</th>
                  <th width="10%">K</th>
                  <th width="10%">BK</th>
                </tr>
              </thead>
              <tbody v-for="(element, j) in unit.work_elements" :key="j">
                <tr>
                  <th colspan="3">
                    {{ i+1 }}.{{ j+1 }}.
                    Elemen : {{ element.title }}
                  </th>
                </tr>
                <tr v-for="(job, k) in element.job_criterias" :key="k">
                  <td>
                    <div style="margin-left: 1.5rem;">
                      {{ i+1 }}.{{ j+1 }}.{{ k+1 }}.
                      {{ job.title }}
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input :id="`inputCompetent-${i}-${j}-${k}`" v-model="form.apl02[i][j][k]" :name="`job-${i}-${j}-${k}`" class="form-check-input" type="radio" value="1">
                      <label :for="`inputCompetent-${i}-${j}-${k}`" class="form-check-label"></label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input :id="`inputIncompetent-${i}-${j}-${k}`" v-model="form.apl02[i][j][k]" :name="`job-${i}-${j}-${k}`" class="form-check-input" type="radio" value="0">
                      <label :for="`inputIncompetent-${i}-${j}-${k}`" class="form-check-label"></label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </CollapsibleItem>
        </Collapsible>
      </CollapsibleItem>
      <CollapsibleItem title="FR-MAK-01. FORMULIR PERSETUJUAN ASESMEN DAN KERAHASIAAN">
        <div class="tw-text-center tw-mb-2 tw-px-6 tw-bg-blue-100 tw-p-1 tw-border tw-border-blue-500 tw-rounded">
          <font-awesome-icon :icon="['fas', 'check']" class="text-center" />
          Saya setuju mengikuti asesmen dengan pemahaman bahwa informasi yang dikumpulkan
          hanya digunakan untuk pengembangan profesional dan hanya dapat diakses oleh orang
          tertentu saja.
        </div>
        <table class="tw-mb-2">
          <tr>
            <td colspan="2">Pelaksanaan asesmen disepakati pada:</td>
          </tr>
          <tr>
            <th>Skema</th>
            <td>: {{ schema.title }}</td>
          </tr>
          <tr>
            <th>Asesor</th>
            <td>: {{ assessment.assessor.name }}</td>
          </tr>
          <tr>
            <th>Hari/ Tanggal</th>
            <td>
              : {{ $moment(assessment.schedule.date_start).format('DD/MM/YYYY').toString() }}
              - {{ $moment(assessment.schedule.date_end).format('DD/MM/YYYY').toString() }}
            </td>
          </tr>
          <tr>
            <th>Tempat</th>
            <td>: {{ assessment.room.name }} - {{ assessment.room.place.name }}</td>
          </tr>
        </table>
      </CollapsibleItem>
    </Collapsible>
  </OverlayPage>
</template>

<script>
import { defineComponent, onBeforeMount, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    schema: {
      type: Object,
      required: true,
    },
    assessment: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const { $swal, $overlayLoading, $axios } = useContext()
    const close = () => emit('close')
    const isLoading = ref(false)

    const form = ref({
      apl02: [],
      mak01: [],
    })

    onBeforeMount(() => {
      const units = []
      props.schema.competency_units.forEach(unit => {
        const elements = []
        unit.work_elements.forEach(element => {
          const jobs = []
          element.job_criterias.forEach(job => {
            jobs.push("1")
          })
          elements.push(jobs)
        })
        units.push(elements)
      })
      form.value.apl02 = units
    })

    const send = () => {
      $swal({
        title: 'Apakah kamu yakin?',
        text: 'Menyetujui akan otomatis menandatangi dokumen ini juga.',
        icon: 'question',
        showCancelButton: true,
        allowOutsideClick: false
      }).then((m) => {
        if (m.isConfirmed) {
          $overlayLoading.show()
          $axios({
            method: 'get',
            url: `/accession/assessments/${props.assessment.id}/approve`
          }).finally(() => {
            $overlayLoading.hide()
            close()
          })
        }
      })
    }

    return {
      close,
      isLoading,
      form,
      send,
    }
  }
})
</script>
