<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb :page="(assessment) ? assessment.schema.title : ''" :data="[{ text: 'Asesmen', link: '/accession/assessments' }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>ASESMEN</h2>
      </div>
      <div />
    </div>
    <div v-if="assessment" class="tw-flex-1 tw-flex tw-flex-col tw-overflow-y-auto">
      <div class="tw-px-6">
        <!-- section 1 -->
        <div class="tw-mb-4">
          <Progress text="Progres Asesmen Anda" :value="progress" />
        </div>
        <!-- section 2 -->
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-mb-4">
          <div class="tw-relative tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-space-x-3 tw-bg-blue-100">
            <div class="tw-text-blue-500 tw-right-0 tw-bottom-0 tw-text-3xl tw-flex">
              <font-awesome-icon :icon="['far', 'flag']" class="tw-self-center" />
            </div>
            <div>
              <div class="tw-text tw-font-semibold">Keputusan</div>
              <div class="tw-text-sm tw-text-gray-500">
                <span v-if="assessment.status === null" class="badge badge-sm bg-warning">Belum Diputuskan</span>
                <span v-else-if="assessment.status === 'Competent'" class="badge badge-sm bg-success">Kompeten</span>
                <span v-else-if="assessment.status === 'Incompetent'" class="badge badge-sm bg-danger">Tidak Kompeten</span>
              </div>
            </div>
          </div>
          <div class="tw-relative tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-space-x-3 tw-bg-purple-100">
            <div class="tw-text-purple-500 tw-right-0 tw-bottom-0 tw-text-3xl tw-flex">
              <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" class="tw-self-center" />
            </div>
            <div>
              <div class="tw-text tw-font-semibold">Asesor</div>
              <div class="tw-text-sm tw-text-gray-500">{{ assessment.assessor.name }}</div>
            </div>
          </div>
          <div class="tw-relative tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-space-x-3 tw-bg-pink-100">
            <div class="tw-text-pink-500 tw-right-0 tw-bottom-0 tw-text-3xl tw-flex">
              <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" class="tw-self-center" />
            </div>
            <div>
              <div class="tw-text tw-font-semibold">Jadwal</div>
              <div class="tw-text-sm tw-text-gray-500">
                {{ $moment(assessment.schedule.date_start).format('DD/MM/YYYY').toString() }} -
                {{ $moment(assessment.schedule.date_end).format('DD/MM/YYYY').toString() }}
              </div>
            </div>
          </div>
        </div>
        <!-- section 3 -->
        <div v-for="(item, i) in menus" :key="i">
          <div class="tw-relative tw-mb-2 tw-overflow-hidden tw-rounded-lg tw-w-full tw-py-4 tw-px-4 tw-flex tw-flex-row tw-space-x-4 tw-cursor-pointer tw-transition tw-text-gray-700 tw-bg-gray-200 hover:tw-bg-gray-300" @click="selectMenu(item)">
            <div
              class="tw-flex tw-justify-center tw-rounded-xl tw-w-10 tw-h-10 tw-text-center"
              :class="{
                'tw-bg-blue-200 tw-text-blue-600': ('blue' === item.color),
                'tw-bg-red-200 tw-text-red-600': ('red' === item.color),
                'tw-bg-yellow-200 tw-text-yellow-600': ('yellow' === item.color),
                'tw-bg-green-200 tw-text-green-600': ('green' === item.color),
                'tw-bg-pink-200 tw-text-pink-600': ('pink' === item.color),
                'tw-bg-purple-200 tw-text-purple-600': ('purple' === item.color),
              }"
            >
              <font-awesome-icon :icon="item.icon" class="tw-self-center tw-text-2xl" />
            </div>
            <div class="tw-flex-1 tw-flex tw-flex-col tw-truncate tw-overflow-ellipsis">
              <div class="tw-text tw-font-bold">{{ item.title }}</div>
              <div class="tw-max-w-full tw-text-sm tw-flex-1 tw-text-gray-500">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AccessionAssessmentApprove v-if="assessment && showModalForApprove" :assessment="assessment" :schema="assessment.schema" @close="onShowModalForApproveClose" />
    <AccessionAssessmentAnnouncement v-if="assessment && showModalForAnnouncement" :assessment="assessment" @close="closeModalForAnnouncement" />
  </div>
</template>

<script>
import { defineComponent, onUpdated, reactive, ref, useContext } from '@nuxtjs/composition-api'
import { useAssessmentFetch } from '@/api/accession/assessment.js'

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_accession'],
  transition: 'page',
  setup (_, { refs }) {
    const { redirect, params } = useContext()
    const { assessmentId } = params.value
    const back = () => redirect({ name: 'accession-assessments' })
    const { assessment, fetchAssessment } = useAssessmentFetch()
    const showModalForApprove = ref(false)
    const showModalForAnnouncement = ref(false)
    const closed = ref(false)
    const progress = ref(0)

    const menus = reactive([
      {
        title: 'File Persyaratan & Pendukung',
        description: 'Lihat, tambah atau unduh kembali file persyaratan dan pendukung yang sudah anda upload.',
        icon: ['fas', 'folder'],
        color: 'green',
        route: { name: 'accession-assessments-assessmentId-files', params: { assessmentId } },
      },
      {
        title: 'Pengumuman',
        description: 'Lihat pengumuman.',
        icon: ['fas', 'file-pdf'],
        color: 'yellow',
        onClick: () => {
          showModalForAnnouncement.value = true
        },
      },
      {
        title: 'Unduh Dokumen',
        description: 'Unduh semua dokumen dari asesmen ini secara digital.',
        icon: ['fas', 'file-pdf'],
        color: 'blue',
        route: { name: 'accession-assessments-assessmentId-documents', params: { assessmentId } },
      },
    ])

    onUpdated(() => {
      if (assessment.value) {
        if (!assessment.value.status || assessment.value.status === null) {
          progress.value = 10
        } else {
          progress.value = 100
        }
        //
        // showModalForAnnouncement.value = (assessment.value)

        //
        showModalForApprove.value = (assessment.value.approved_accession_at == null)
        if (closed.value && showModalForApprove.value) {
          back()
        }
      }
    })

    //
    const onShowModalForApproveClose = () => {
      // assessment.value.approved_accession_at = new Date
      // showModalForApprove.value = false
      fetchAssessment()
      closed.value = true
    }
    const closeModalForAnnouncement = () => {
      showModalForAnnouncement.value = false
    }
    const selectMenu = (item) => {
      if (item.onClick) {
        item.onClick()
      } else if (item.route) {
        redirect(item.route)
      }
    }

    return {
      back,
      assessment,
      menus,
      selectMenu,

      showModalForAnnouncement,
      closeModalForAnnouncement,

      progress,

      showModalForApprove,
      onShowModalForApproveClose
    }
  }
})
</script>
