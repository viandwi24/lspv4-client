<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Asesmen Saya" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>ASESI SAYA</h2>
      </div>
      <div />
    </div>
    <ListTable
      ref="table0"
      url="/assessor/assessments"
      :filters="{
        perPage: 10,
        order: 'desc',
        schedule: 'all',
        place: 'all',
        status: 'all',
        search: ''
      }"
    >
      <div slot="action" slot-scope="props">
        <div class="tw-flex tw-flex-col tw-space-y-1">
          <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
            <div class="tw-flex tw-flex-row tw-flex-1 tw-w-full md:tw-w-auto md:tw-flex-none tw-space-x-2 tw-mx-1">
              <div class="">
                <button class="btn btn-secondary" @click="() => { props.filters.order = (props.filters.order == 'asc' ? 'desc' : 'asc'); props.refresh(); }">
                  <span :class="{ 'tw-text-gray-400': (props.filters.order == 'desc') }">▼</span>
                  <span :class="{ 'tw-text-gray-400': (props.filters.order != 'desc') }">▲</span>
                </button>
              </div>
              <div class="tw-flex-1">
                <select v-model="props.filters.perPage" class="form-control" @change="props.changePerPage(props.filters.perPage)">
                  <option v-for="(item, i) in props.entries" :key="i" :value="item">
                    Tampilkan {{ item }} item
                  </option>
                </select>
              </div>
            </div>
            <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 form-group tw-flex tw-space-x-2">
              <input v-model="props.filters.search" type="text" class="form-control" placeholder="Cari..." @change="props.refresh()">
              <button class="btn btn-secondary" @click="props.refresh()">
                <font-awesome-icon :icon="['fas', 'sync']" />
              </button>
            </div>
          </div>
          <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
            <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
              <select v-model="props.filters.status" class="form-control" @change="props.refresh()">
                <option v-for="(item, i) in filters.status" :key="i" :value="item">
                  Status : {{ i }}
                </option>
              </select>
            </div>
            <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
              <select v-model="props.filters.schedule" class="form-control" @change="props.refresh()">
                <option v-for="(item, i) in filtersSchedules" :key="i" :value="item.value">
                  Jadwal : {{ item.text }}
                </option>
              </select>
            </div>
            <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
              <select v-model="props.filters.place" class="form-control" @change="props.refresh()">
                <option v-for="(item, i) in filtersPlaces" :key="i" :value="item.value">
                  Tempat : {{ item.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div slot="row" slot-scope="props" class="tw-flex-1">
        <div class="list-datatables-item">
          <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
            <div class="main">
              {{ props.row.accession.name }}
            </div>
            <div class="tw-text-sm text-muted">
              <div>
                Skema : {{ props.row.schema.title }}
              </div>
              <div>
                Keputusan :
                <span v-if="props.row.status === null" class="badge badge-sm bg-warning">Belum Diputuskan</span>
                <span v-else-if="props.row.status === 'Competent'" class="badge badge-sm bg-success">Kompeten</span>
                <span v-else-if="props.row.status === 'Incompetent'" class="badge badge-sm bg-danger">Tidak Kompeten</span>
              </div>
            </div>
          </div>
          <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
            <NuxtLink
              tag="button"
              class="btn btn-sm btn-primary btn-rounded"
              style="padding: 6px 10px 5px 10px;"
              :to="{
                name: 'assessor-assessments-assessmentId',
                params: { assessmentId: props.row.id }
              }"
            >
              <font-awesome-icon :icon="['fas', 'user-secret']" class="tw-mr-1" />
              <span>Asesmen</span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="tw-flex tw-flex-row">
          <div class="dropdown dropup">
            <Button text="MENU" :styles="[ 'big', 'blue' ]" class="dropdown-toggle" data-bs-toggle="dropdown" />
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="dropdown-item" @click="downloadAssessorLetterAssignment">
                  <font-awesome-icon :icon="['fas', 'envelope']" class="tw-mr-2 tw-text-sm" />
                  <span>Unduh Surat Tugas Asesor</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ListTable>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, useContext } from "@nuxtjs/composition-api"

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_assessor'],
  transition: 'page',
  setup (_, { refs }) {
    const { redirect, $overlayLoading, $axios, $auth } = useContext()
    const back = () => redirect({ name: 'assessor' })
    const onTabChange = (index) => {
      refs[`table${index}`].refresh()
    }

    // filters
    const filters = reactive({
      status: {
        'Semua': 'all',
        'Belum Diputuskan': '',
        'Kompeten': 'Competent',
        'Tidak Kompeten': 'Incompetent'
      }
    })
    const filtersSchedules = ref([])
    const filtersPlaces = ref({})
    const filtersSchemas = ref({})

    // mounted
    onMounted(async () => {
      $overlayLoading.show()
      const http = (await getFilters($axios)).data.data

      // schema
      try {
        const schemas = [{ value: 'all', text: 'Semua' }]
        for (let i = 0; i < http.schemas.length; i++) {
          schemas.push({ value: http.schemas[i].id, text: http.schemas[i].title })
        }
        filtersSchemas.value = schemas

        const schedules = [{ value: 'all', text: 'Semua' }]
        for (let i = 0; i < http.schedules.length; i++) {
          schedules.push({ value: http.schedules[i].id, text: http.schedules[i].title })
        }
        filtersSchedules.value = schedules

        const places = [{ value: 'all', text: 'Semua' }]
        for (let i = 0; i < http.places.length; i++) {
          places.push({ value: http.places[i].id, text: `${http.places[i].name} - ${http.places[i].place.name}` })
        }
        filtersPlaces.value = places
      } catch (error) {
      }

      $overlayLoading.hide()
    })
    const downloadAssessorLetterAssignment = () => {
      function objectToQueryString(obj) {
        const str = [];
        for (const p in obj)
          // eslint-disable-next-line no-prototype-builtins
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        return str.join("&");
      }
      window.open(`${$axios.defaults.baseURL}/assessor/assessments/pdf/letter-assignment?${objectToQueryString({ ...refs.table0.filters, token: $auth.getToken() })}`, '_blank')
      // $overlayLoading.show()
      // $axios({
      //   method: 'GET',
      //   url: `/assessor/assessments/pdf/letter-assignment`,
      //   params: {
      //     filters: { ...refs.table0.filters },
      //   },
      //   responseType: 'blob',
      // }).then((res) => {
      //   const fileURL = window.URL.createObjectURL(new Blob([res.data]));
      //   const fileLink = document.createElement('a');
      //   fileLink.href = fileURL;
      //   fileLink.setAttribute('download', 'surat-tugas-asesor.pdf');
      //   document.body.appendChild(fileLink);
      //   fileLink.click();
      // }).finally(() => {
      //   $overlayLoading.hide()
      // })
    }

    return {
      back,
      onTabChange,

      filters,
      filtersSchemas,
      filtersSchedules,
      filtersPlaces,

      downloadAssessorLetterAssignment,
    }
  }
})


function getFilters ($axios) {
  return $axios({
    method: 'GET',
    url: `/assessor/assessments/filters`
  })
}
</script>
