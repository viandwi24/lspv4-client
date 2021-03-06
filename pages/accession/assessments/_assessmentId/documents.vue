<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb v-if="assessment" page="Dokumen" :data="[{ text: 'Asesmen', link: '/accession/assessments' }, { text: assessment.schema.title, link: `/accession/assessments/${assessment.id}` }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>DOKUMEN</h2>
      </div>
      <div />
    </div>
    <div v-if="assessment" class="tw-flex-1 tw-overflow-y-auto tw-px-6 ptw-py-2">
      <a
        v-for="(item, i) in menus"
        :key="i"
        class="tw-relative tw-no-underline tw-mb-2 tw-overflow-hidden tw-rounded-lg tw-w-full tw-py-4 tw-px-4 tw-flex tw-flex-row tw-space-x-4 tw-cursor-pointer tw-transition tw-text-gray-700 tw-bg-gray-200 hover:tw-bg-gray-300"
        :href="`${$axios.defaults.baseURL}/pdf/assessments/${assessment.id}/${item.document}?token=${$auth.getToken()}`"
        target="_blank"
      >
        <div class="tw-flex tw-justify-center tw-rounded-xl tw-w-10 tw-h-10 tw-text-center" :class="`tw-bg-${item.color}-200 tw-text-${item.color}-600`">
          <font-awesome-icon :icon="item.icon" class="tw-self-center tw-text-2xl" />
        </div>
        <div class="tw-flex-1 tw-flex tw-flex-col tw-truncate tw-overflow-ellipsis">
          <div class="tw-text tw-font-bold tw-text-gray-700">{{ item.title }}</div>
          <div class="tw-max-w-full tw-text-sm tw-flex-1 tw-text-gray-500">{{ item.description }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'
import { useAssessmentFetch } from '@/api/accession/assessment.js'

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_accession'],
  transition: 'page',
  setup (_, { refs }) {
    const { redirect } = useContext()
    const back = () => redirect({ name: 'accession-assessments-assessmentId' })
    const { assessment } = useAssessmentFetch()

    const menus = reactive([
      {
        title: '(FR-APL-01) FORMULIR PERMOHONAN SERTIFIKASI KOMPETENSI',
        description: 'Dokumen ini mencatat formulir permohonan yang telah anda ajukan.',
        icon: ['fas', 'file-pdf'],
        color: 'green',
        document: 'frapl01'
      },
      {
        title: '(FR-APL-02) ASESMEN MANDIRI',
        description: 'Dokumen ini berisi asesmen mandiri yang telah anda isi.',
        icon: ['fas', 'file-pdf'],
        color: 'blue',
        document: 'frapl02'
      },
      {
        title: '(FR-MAK-01) FORMULIR PERSETUJUAN ASESMEN DAN KERAHASIAAN',
        description: 'Dokumen ini berisi persetujuan asesmen dan kerahasian anda.',
        icon: ['fas', 'file-pdf'],
        color: 'red',
        document: 'frmak01'
      },
      {
        title: '(FR-AI-01) CEKLIS OBSERVASI UNTUK KEGIATAN TERSTRUKTUR',
        description: 'Dokumen ini berisi observasi asesor dari kegiatan.',
        icon: ['fas', 'file-pdf'],
        color: 'pink',
        document: 'frai01'
      },
      {
        title: '(FR-AC-01) FORMULIR REKAMAN ASESMEN KOMPETENSI',
        description: 'Dokumen ini berisi observasi asesor terhadap bukti asesmen.',
        icon: ['fas', 'file-pdf'],
        color: 'yellow',
        document: 'frac01'
      },
      {
        title: '(FR-AI-02) PERTANYAAN PENDUKUNG OBSERVASI',
        description: 'Dokumen ini berisi tanggapan asesi dari pertanyaan untuk observasi.',
        icon: ['fas', 'file-pdf'],
        color: 'purple',
        document: 'frai02'
      }
    ])

    return {
      back,
      assessment,
      menus,
    }
  }
})
</script>
