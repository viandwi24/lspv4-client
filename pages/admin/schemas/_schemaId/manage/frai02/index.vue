<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Pertanyaan Pendukung Observasi" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: back}]" />
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
        <div v-for="(unit, i) in units" :key="i" class="mb-4">
          <div>
            <span>{{ unit.title }}</span>
            <a href="#" class="tw-text-xs" @click.prevent="addQuestion(i)">Tambah</a>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th width="4%">#</th>
                <th>Pertanyaan</th>
                <th width="6%">...</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="unit.questions.length == 0">
                <td colspan="3" class="text-center">Tidak ada pertanyaan</td>
              </tr>
              <tr v-for="(question, j) in unit.questions" :key="j">
                <td>{{ j + 1 }}</td>
                <td>
                  <input v-model="units[i].questions[j].question" type="text" class="form-control form-control-sm">
                </td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="removeQuestion(i, j)">
                    <font-awesome-icon :icon="['fas', 'times']" />
                  </button>
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
import { useSchemaFetch } from '@/api/admin/schema.js'
import { useCrud } from '@/api/crud.js'

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup() {
    const { params, redirect, $overlayLoading, $axios } = useContext()
    const { schemaId } = params.value
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const crud = useCrud(`/admin/schemas/${schemaId}/frai02`)
    const { schema } = useSchemaFetch()
    const form = reactive([])
    const units = reactive([])

    // fetch data
    const { fetch } = useFetch(async () => {
      try {
        const res = await crud.read()
        const data = res.data.data
        // clear
        units.splice(0, units.length)
        // push
        data.forEach(item => units.push(item))
        // // clear form
        // form.splice(0, form.length)
        // // set form
      } catch (error) {
      }
    })

    // methods
    const addQuestion = (i) => {
      units[i].questions.push({
        schema_competency_unit_id: units[i].id,
        question: ''
      })
    }
    const removeQuestion = (i, j) => {
      units[i].questions.splice(j, 1)
    }
    const save = async () => {
      $overlayLoading.show()

      //
      const data = []
      units.forEach(item => {
        if (item.questions && item.questions.length > 0) {
          item.questions.forEach(question => {
            data.push(question)
          })
        }
      })

      //
      try {
        const res = await $axios({
          method: 'PUT',
          url: crud.url,
          data: {
            questions: data
          }
        })
        console.log(res)
      } catch (error) {
        crud.errorsAction(error)
      }
      $overlayLoading.hide()
    }

    // lifecycle
    onMounted(() => {
      fetch()
    })

    return {
      back,
      schema,
      form,
      units,
      addQuestion,
      removeQuestion,
      save
    }
  },
})
</script>

