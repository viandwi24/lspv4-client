<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Unit Kompetensi" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>UNIT KOMPETENSI</h2>
      </div>
      <div />
    </div>
    <div class="tw-flex-1 tw-max-h-full tw-overflow-hidden tw-flex tw-p-4">
      <div class="tw-flex-1 tw-flex-col tw-max-h-full tw-overflow-y-auto tw-rounded-lg tw-p-4 tw-bg-gray-200">
        <span v-if="competencyUnits.length == 0" class="tw-block tw-text-center">Tidak ada item.</span>
        <div v-for="(unit, i) in competencyUnits" :key="i" class="card-item">
          <div class="card-item-header">
            <div v-if="cardItemActive == null || (cardItemActive.type != 'unit' || cardItemActive.index != i)" class="card-item-title">
              <span class="badge bg-secondary">{{ i+1 }}</span>
              {{ unit.code }} - {{ unit.title }}
              <div v-if="cardItemActive ? (cardItemActive.type == 'unit' && cardItemActive.index == i) : true" class="link-action">
                [
                <div v-if="cardItemActive == null" class="edit" @click="cardItemEdit('unit', i)">
                  edit
                </div> |
                <div v-if="cardItemActive == null" class="hapus" @click="cardItemDelete('unit', i)">
                  hapus
                </div>
                ]
              </div>
            </div>
            <div v-if="cardItemActive && cardItemActive.type == 'unit' && cardItemActive.index == i" class="card-item-title">
              <div class="form tw-flex tw-flex-col tw-space-y-1 md:tw-flex-row md:tw-space-x-2 md:tw-space-y-0  my-1">
                <div class="tw-w-full md:tw-w-1/4">
                  <input v-model="competencyUnits[cardItemActive.index].code" type="text" class="form-control form-control-sm" placeholder="Code...">
                </div>
                <div class="col">
                  <textarea v-model="competencyUnits[cardItemActive.index].title" class="form-control form-control-sm" placeholder="Unit..." />
                </div>
              </div>
              <div class="link-action">
                [
                <div v-if="cardItemActive && cardItemActive.type == 'unit' && cardItemActive.index == i" class="simpan" @click="cardItemSave('unit', i)">
                  simpan
                </div> |
                <div v-if="cardItemActive && cardItemActive.type == 'unit' && cardItemActive.index == i" class="simpan" @click="cardItemCancelEdit('unit', i)">
                  batal
                </div>
                ]
              </div>
            </div>
          </div>
          <div class="card-item-content">
            <div v-if="cardItemActive == null" class="link-action">
              <div class="edit" @click="cardItemCreate('element', i)">
                <font-awesome-icon :icon="['fas', 'plus']" class="tw-text-xs" />
                tambah element
              </div>
            </div>
            <div v-if="unit.work_elements">
              <span v-if="unit.work_elements.length == 0" class="tw-block tw-text-center">Tidak ada item.</span>
              <div v-for="(element, j) in unit.work_elements" :key="j" class="card-item card-item-sm">
                <div class="card-item-header">
                  <div v-if="cardItemActive == null || (cardItemActive.type != 'element' || cardItemActive.index != i || cardItemActive.elementIndex != j)" class="card-item-title">
                    <span class="badge bg-secondary">{{ i+1 }}.{{ j+1 }}</span>
                    {{ element.title }}
                    <div v-if="cardItemActive ? (cardItemActive.type == 'element' && (cardItemActive.index == i && cardItemActive.elementIndex == j)) : true" class="link-action">
                      [
                      <div class="edit" @click="cardItemEdit('element', i, j)">
                        edit
                      </div> |
                      <div class="hapus" @click="cardItemDelete('element', i, j)">
                        hapus
                      </div>
                      ]
                    </div>
                  </div>
                  <div v-if="cardItemActive && cardItemActive.type == 'element' && (cardItemActive.index == i && cardItemActive.elementIndex == j)" class="card-item-title">
                    <div class="form row g-1 my-1">
                      <div class="col">
                        <textarea v-model="competencyUnits[i].work_elements[j].title" class="form-control form-control-sm" placeholder="Element..." />
                      </div>
                    </div>
                    <div class="link-action">
                      [
                      <div @click="cardItemSave('element', i, j)">
                        simpan
                      </div> |
                      <div @click="cardItemCancelEdit">
                        batal
                      </div>
                      ]
                    </div>
                  </div>
                </div>
                <div v-if="element.job_criterias" class="card-item-content">
                  <div v-if="cardItemActive == null" class="link-action">
                    <div class="edit" @click="cardItemCreate('job', i, j)">
                      <font-awesome-icon :icon="['fas', 'plus']" class="tw-text-xs" />
                      tambah kuk
                    </div>
                  </div>
                  <span v-if="element.job_criterias.length == 0" class="tw-block tw-text-center">Tidak ada item.</span>
                  <ul class="tw-m-0 tw-text-xs tw-list-disc tw-pl-6">
                    <li v-for="(job, k) in element.job_criterias" :key="k">
                      <div v-if="cardItemActive == null || (cardItemActive.type != 'job' || cardItemActive.index != i || cardItemActive.elementIndex != j || cardItemActive.jobIndex != k)">
                        <span class="badge bg-secondary">{{ i+1 }}.{{ j+1 }}.{{ k+1 }}</span>
                        {{ job.title }}
                        <div v-if="cardItemActive ? (cardItemActive.type == 'job' && (cardItemActive.index == i && cardItemActive.elementIndex == j && cardItemActive.jobIndex == k)) : true" class="link-action">
                          [
                          <div class="edit" @click="cardItemEdit('job', i, j, k)">
                            edit
                          </div> |
                          <div class="hapus" @click="cardItemDelete('job', i, j, k)">
                            hapus
                          </div>
                          ]
                        </div>
                      </div>
                      <div v-if="cardItemActive && cardItemActive.type == 'job' && (cardItemActive.index == i && cardItemActive.elementIndex == j && cardItemActive.jobIndex == k)">
                        <div class="form row g-1 my-1">
                          <div class="col">
                            <textarea v-model="competencyUnits[i].work_elements[j].job_criterias[k].title" class="form-control form-control-sm" placeholder="Job..." />
                          </div>
                        </div>
                        <div class="link-action">
                          [
                          <div @click="cardItemSave('job', i, j, k)">
                            simpan
                          </div> |
                          <div @click="cardItemCancelEdit">
                            batal
                          </div>
                          ]
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-bg-gray-200 tw-px-4 tw-py-4 tw-flex tw-flex-row tw-justify-around">
      <div class="tw-flex tw-flex-row">
        <Button text="TAMBAH UNIT" :styles="[ 'big', 'blue' ]" :icon="['fas', 'plus']" @click.native="cardItemCreate('unit')" />
      </div>
    </div>
  </div>
</template>

<script>
import { useCrud } from '@/api/crud.js'
import { onBeforeUnmount, onMounted, ref, useContext, useFetch } from '@nuxtjs/composition-api'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { params, redirect, $overlayLoading } = useContext()
    const { schemaId } = params.value
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const { show } = useCrud('/admin/schemas')
    const competencyUnits = ref([])
    const {
      fetchCard,
      initCard,
      cardItemCreate,
      destroyCard,
      cardItemActive,
      cardItemSave,
      cardItemEdit,
      cardItemDelete,
      cardItemCancelEdit,
      onTitleClick
    } = useCard(competencyUnits, back)
    const schema = ref(null)

    // fecth
    const { fetch } = useFetch(async () => {
      const id = params.value.schemaId
      $overlayLoading.show()
      try {
        // form
        const result = await show(id)
        const data = result.data.data
        schema.value = data
      } catch (error) {
        back()
      }
      $overlayLoading.hide()
    })
    fetch()
    fetchCard()

    // lifecycle
    let timer
    onMounted(() => {
      timer = setInterval(() => {
        initCard()
      }, 1000)
    })
    onBeforeUnmount(() => {
      clearInterval(timer)
      destroyCard()
    })

    return {
      back,
      competencyUnits,
      cardItemCreate,
      cardItemActive,
      cardItemSave,
      cardItemEdit,
      cardItemDelete,
      cardItemCancelEdit,
      onTitleClick,
      schema
    }
  }
}

function useCard (competencyUnits, back) {
  const root = useContext()
  const { params, $overlayLoading, $axios } = root
  const { schemaId } = params.value

  const { fetch } = useFetch(async () => {
    $overlayLoading.show()
    try {
      await $axios({
        method: 'get',
        url: `/admin/schemas/${schemaId}/competency-units`
      }).then((res) => {
        competencyUnits.value = res.data.data
      })
    } catch (error) {
      back()
    }
    $overlayLoading.hide()
  })
  const init = () => {
    try {
      destroy()
      document.querySelectorAll('.card-item-header').forEach((el) => {
        const header = el
        header.addEventListener('click', onTitleClick)
        // header.querySelector('.card-item-title').addEventListener('click', onTitleClick)
        // header.querySelector('.card-item-title').querySelector('span:nth-child(2)').addEventListener('click', onTitleClick)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const destroy = () => {
    try {
      document.querySelectorAll('.card-item-header').forEach((el) => {
        const header = el
        header.removeEventListener('click', onTitleClick)
        // header.parentElement.querySelector('.card-item-header::before').removeEventListener('click', onTitleClick)
        // header.querySelector('.card-item-title').removeEventListener('click', onTitleClick)
        // header.querySelector('.card-item-title').querySelector('span:nth-child(2)').removeEventListener('click', onTitleClick)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const onTitleClick = function (e) {
    const elTitle = e.target
    const elCard = elTitle.parentElement.parentElement
    if (elCard.classList.contains('collapsed')) {
      elCard.classList.remove('collapsed')
    } else {
      elCard.classList.add('collapsed')
    }
  }

  // funcs
  const cardItemActive = ref(null)
  const cardItemSave = async (type, unitIndex = null, elementIndex = null, jobIndex = null) => {
    const data = competencyUnits.value
    let content
    let crud
    if (type === 'unit') {
      content = data[unitIndex]
      crud = useCrud(`/admin/schemas/${schemaId}/competency-units`, root)
    } else if (type === 'element') {
      const unitId = data[unitIndex].id
      content = data[unitIndex].work_elements[elementIndex]
      crud = useCrud(`/admin/schemas/${schemaId}/competency-units/${unitId}/work-elements`, root)
    } else {
      const unitId = data[unitIndex].id
      const elementId = data[unitIndex].work_elements[elementIndex].id
      content = data[unitIndex].work_elements[elementIndex].job_criterias[jobIndex]
      crud = useCrud(`/admin/schemas/${schemaId}/competency-units/${unitId}/work-elements/${elementId}/job-criterias`, root)
    }

    $overlayLoading.show()
    try {
      await crud.update(content.id, content, null, false)
    } catch (error) {
    }
    $overlayLoading.hide()
    cardItemActive.value = null
    fetch()
  }
  const cardItemEdit = (type, index, elementIndex = null, jobIndex = null) => {
    cardItemActive.value = {
      type,
      index,
      elementIndex,
      jobIndex
    }
  }
  const cardItemDelete = async (type, unitIndex = null, elementIndex = null, jobIndex = null) => {
    const data = competencyUnits.value
    let content
    let crud
    if (type === 'unit') {
      content = data[unitIndex]
      crud = useCrud(`/admin/schemas/${schemaId}/competency-units`, root)
    } else if (type === 'element') {
      const unitId = data[unitIndex].id
      content = data[unitIndex].work_elements[elementIndex]
      crud = useCrud(`/admin/schemas/${schemaId}/competency-units/${unitId}/work-elements`, root)
    } else {
      const unitId = data[unitIndex].id
      const elementId = data[unitIndex].work_elements[elementIndex].id
      content = data[unitIndex].work_elements[elementIndex].job_criterias[jobIndex]
      crud = useCrud(`/admin/schemas/${schemaId}/competency-units/${unitId}/work-elements/${elementId}/job-criterias`, root)
    }

    $overlayLoading.show()
    try {
      await crud.destroy(content.id, false, null, false)
    } catch (error) {
    }
    $overlayLoading.hide()
    fetch()
  }
  const cardItemCancelEdit = () => {
    cardItemActive.value = null
  }
  const cardItemCreate = async (type = 'unit', unitIndex = null, elementIndex = null) => {
    const data = competencyUnits.value
    $overlayLoading.show()
    try {
      let result
      if (type === 'unit') {
        const crud = useCrud(`/admin/schemas/${schemaId}/competency-units`, root)
        let code = competencyUnits.value.length + 1
        code = (code < 100)
          ? (code < 10)
              ? `00${code}`
              : `0${code}`
          : code
        result = await crud.create({
          code,
          title: 'contoh unit',
          standard_type: 'SKKNI'
        }, null, false)
        const resultData = result.data.data
        fetch().then(() => {
          const data = competencyUnits.value
          const s = data.findIndex(item => item.id === resultData.id)
          cardItemActive.value = null
          cardItemEdit('unit', s)
        })
      } else if (type === 'element') {
        const unitId = data[unitIndex].id
        const crud = useCrud(`/admin/schemas/${schemaId}/competency-units/${unitId}/work-elements`, root)
        result = await crud.create({ title: 'contoh element' }, null, false)
        const resultData = result.data.data
        fetch().then(() => {
          const data = competencyUnits.value
          const u = data.findIndex(item => item.id === resultData.schema_competency_unit_id)
          const e = data[u].work_elements.findIndex(item => item.id === resultData.id)
          cardItemActive.value = null
          cardItemEdit('element', u, e)
        })
      } else if (type === 'job') {
        const unitId = data[unitIndex].id
        const elementId = data[unitIndex].work_elements[elementIndex].id
        const crud = useCrud(`/admin/schemas/${schemaId}/competency-units/${unitId}/work-elements/${elementId}/job-criterias`, root)
        result = await crud.create({ title: 'contoh kuk' }, null, false)
        const resultData = result.data.data
        fetch().then(() => {
          const data = competencyUnits.value
          const j = data[unitIndex].work_elements[elementIndex].job_criterias.findIndex(item => item.id === resultData.id)
          cardItemActive.value = null
          cardItemEdit('job', unitIndex, elementIndex, j)
        })
      }
    } catch (error) {
      await fetch()
    }
    $overlayLoading.hide()
  }

  return {
    cardItemCreate,
    fetchCard: fetch,
    initCard: init,
    destroyCard: destroy,
    onCardTitleClick: onTitleClick,
    cardItemActive,
    cardItemSave,
    cardItemEdit,
    cardItemDelete,
    cardItemCancelEdit
  }
}
</script>

<style lang="scss">
.card-item {
  @apply tw-rounded-b tw-rounded-t tw-mb-2 tw-transition-all tw-duration-500;
  border-width: 1px;
  border-color: theme('colors.blue.400');
  background: theme('colors.blue.400');

  &:first-child {
    @apply tw-mt-1;
  }

  &:last-child {
    @apply tw-mb-1;
  }

  &:hover {
    @apply tw-shadow-lg;
    border-color: theme('colors.blue.600');
    background: theme('colors.blue.500');
    & > .card-item-header {
      background: theme('colors.blue.500');
    }
    & > .card-item-content {
      background: theme('colors.blue.200');
    }
  }

  & > .card-item-header {
    @apply tw-rounded-t tw-px-2 tw-py-1 tw-transition-all tw-duration-500;
    cursor: pointer;
    color: theme('colors.gray.100');
    background: theme('colors.blue.400');
    font-size: 16px;
    display: flex;
    flex-direction: row;

    &::before {
      content: "+";
      padding-left: .5rem;
      padding-right: .7rem;
      align-self: center;
    }

    & > .card-item-title {
      display: block;
      flex: 1 1 0%;
    }
  }
  & > .card-item-content {
    @apply tw-px-2 tw-py-1 tw-transition-all tw-duration-500;
    background: theme('colors.blue.100');
    height: 0;
    display: none;
    font-size: 14px;
  }

  &.card-item-sm {
    background: theme('colors.purple.100');
    border-color: theme('colors.purple.400');

    & > .card-item-header {
      background: theme('colors.purple.400');
      font-size: 12px;
    }
  }

  &.collapsed {
    & > .card-item-header {
      &::before {
        content: "-";
        padding-left: .59rem;
        padding-right: .78rem;
      }
    }
    & > .card-item-content {
      height: auto;
      display: block;
    }
  }
}
.link-action {
  @apply tw-ml-2 tw-inline-block tw-text-xs;
  color: theme('colors.purple.700');
  div {
    display: inline-block;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: theme('colors.blue.100');
    }
  }
}
</style>
