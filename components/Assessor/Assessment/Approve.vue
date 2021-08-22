<template>
  <OverlayPage :is-loading="isLoading" title="PERSETUJUAN ASESMEN DAN KERAHASIAAN" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button text="Setujui dan Tanda Tangani" :icon="['fas', 'check']" :styles="['big', 'blue']" @click.native="send" />
    </div>
    <!-- content -->
    <Collapsible v-if="schema">
      <CollapsibleItem title="FR-MAK-01. FORMULIR PERSETUJUAN ASESMEN DAN KERAHASIAAN" :open="true">
        <div class="tw-text-center tw-mb-2 tw-px-6 tw-bg-blue-100 tw-p-1 tw-border tw-border-blue-500 tw-rounded">
          <font-awesome-icon :icon="['fas', 'check']" class="text-center" />
          Menyatakan tidak akan membuka hasil pekerjaan yang saya peroleh karena penugasan
          saya sebagai asesor dalam pekerjaan Asesmen kepada siapapun atau organisasi apapun
          selain kepada pihak yang berwenang sehubungan dengan kewajiban saya sebagai Asesor
          yang ditugaskan oleh LSP.
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
            <th>Asesi</th>
            <td>: {{ assessment.accession.name }}</td>
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
            url: `/assessor/assessments/${props.assessment.id}/approve`
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
