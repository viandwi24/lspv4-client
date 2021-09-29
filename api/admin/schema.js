import { ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { useCrud } from './../crud.js'

export function useSchemaFetch (back) {
  const { params, $overlayLoading } = useContext()
  const { schemaId } = params.value
  const crudSchema = useCrud('/admin/schemas')
  const schema = ref(null)

  // fecth
  const { fetch } = useFetch(async () => {
    $overlayLoading.show()
    try {
      // form
      const result = await crudSchema.show(schemaId)
      const data = result.data.data
      schema.value = data
    } catch (error) {
      back()
    }
    $overlayLoading.hide()
  })
  fetch()

  // return
  return {
    schema,
    crud: crudSchema
  }
}
