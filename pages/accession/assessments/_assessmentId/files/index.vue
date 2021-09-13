<template>
  <div v-if="assessment" class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="File" :data="[{ text: 'Asesmen', link: '/accession/assessments' }, { text: assessment.schema.title, link: `/accession/assessments/${assessment.id}` }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>FILE</h2>
      </div>
      <div />
    </div>
    <div class="tw-flex-1 tw-overflow-y-auto tw-px-6 ptw-py-2">
      <a
        v-for="(item, i) in files"
        :key="i"
        class="tw-relative tw-no-underline tw-mb-2 tw-overflow-hidden tw-rounded-lg tw-w-full tw-py-4 tw-px-4 tw-flex tw-flex-row tw-space-x-4 tw-cursor-pointer tw-transition tw-text-gray-700 tw-bg-gray-200 hover:tw-bg-gray-300"
        :href="`${$axios.defaults.baseURL}/files/assessments/${assessment.id}/${item.document}?token=${$auth.getToken()}`"
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
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
          <Button text="TAMBAH" :styles="[ 'big', 'blue' ]" :icon="['fas', 'plus']" @click.native.prevent="add" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { useAssessmentFetch } from '@/api/accession/assessment.js'

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_accession'],
  transition: 'page',
  setup (_, { refs }) {
    const { redirect } = useContext()
    const back = () => redirect({ name: 'accession-assessments-assessmentId' })
    const add = () => redirect({ name: 'accession-assessments-assessmentId-files-add' })
    const { assessment } = useAssessmentFetch()
    const files = computed(() => {
      if (!assessment || !assessment.value) return []
      const result = []
      if (Array.isArray(assessment.value.request.files)) {
        [ ...assessment.value.request.files ].forEach(file => {
          result.push({
            title: file.name,
            description: file.type,
            icon: ['fas', 'file-pdf'],
            color: randColor(),
            document: file.id
          })
        })
      }
      return result
    })

    const randColor = () => {
      const colors = ['blue', 'green', 'purple', 'red', 'yellow', 'pink']
      return colors[Math.floor(Math.random() * colors.length)]
    }

    return {
      back,
      add,
      assessment,
      files,
      randColor
    }
  }
})
</script>
