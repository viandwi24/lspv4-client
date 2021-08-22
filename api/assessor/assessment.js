import { ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { useCrud } from '../crud.js'

export function useAssessmentFetch (back, callback) {
  const { params, $overlayLoading } = useContext()
  const { assessmentId } = params.value
  const crudAssessment = useCrud('/assessor/assessments')
  const assessment = ref(null)

  // fecth
  const { fetch } = useFetch(async () => {
    $overlayLoading.show()
    try {
      // form
      const result = await crudAssessment.show(assessmentId)
      const data = result.data.data
      assessment.value = data
    } catch (error) {
      back()
    }
    $overlayLoading.hide()
    if (typeof callback !== 'undefined') {
      callback()
    }
  })
  fetch()

  // return
  return {
    assessment,
    crudAssessment,
    fetchAssessment: fetch,
  }
}
