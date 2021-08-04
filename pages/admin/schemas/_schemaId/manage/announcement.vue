<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Tempat Uji" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>PENGUMUMAN</h2>
      </div>
      <div />
    </div>
    <div class="panel-center-content tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-overflow-hidden">
      <Tabs>
        <Tab title="Asesi" class="tab__flex">
          <VueEditor v-if="schema" id="editor_announcement_accession" v-model="form.announcement_accession" />
        </Tab>
        <Tab title="Asesor">
          <VueEditor v-if="schema" id="editor_announcement_assessor" v-model="form.announcement_assessor" />
        </Tab>
      </Tabs>
    </div>
    <div class="panel-footer">
      <div class="tw-flex tw-flex-col">
        <Button text="SIMPAN" :styles="[ 'big', 'blue' ]" :icon="['fas', 'save']" @click.native="save" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, useContext, watch } from '@nuxtjs/composition-api'
import { useSchemaFetch } from '@/api/schema.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { params, redirect } = useContext()
    const { schemaId } = params.value
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const { schema, crudSchema } = useSchemaFetch(back)
    const form = reactive({
      announcement_accession: '',
      announcement_assessor: ''
    })
    watch(schema, (val) => {
      form.announcement_accession = val.announcement_accession
      form.announcement_assessor = val.announcement_assessor
    })

    // actions
    const save = () => {
      crudSchema.update(schemaId, form)
    }

    return {
      back,
      schema,
      save,
      form
    }
  }
}
</script>

<style lang="scss" scoped>
.editor__flex {
  position: relative;
  // display: flex;
  // flex-direction: column;
  // flex: 1 1 0%;
  // max-height: 100%;
  // & .ql-container {
  //   flex: 1 1 0%;
  // }
  // & .ql-editor {
  //   overflow-y: scroll;
  // }
}
</style>
