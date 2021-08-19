<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Asesi" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>ASESI</h2>
      </div>
      <div />
    </div>
    <ListTable
      v-if="schema"
      ref="table"
      :url="`/admin/schemas/${schema.id}/accessions`"
      :filters="{
        perPage: 10,
        order: 'desc',
        schedule: 'all',
        place: 'all',
        assessor: 'all',
        status: '',
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
            <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
              <select v-model="props.filters.status" class="form-control" @change="props.refresh()">
                <option v-for="(item, i) in filters.status" :key="i" :value="item">
                  Status : {{ i }}
                </option>
              </select>
            </div>
            <div class="tw-w-full tw-flex-1 tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 form-group tw-flex tw-space-x-2">
              <input v-model="props.filters.search" type="text" class="form-control" placeholder="Cari..." @change="props.refresh()">
              <button class="btn btn-secondary" @click="props.refresh()">
                <font-awesome-icon :icon="['fas', 'sync']" />
              </button>
            </div>
          </div>
          <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
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
            <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
              <select v-model="props.filters.assessor" class="form-control" @change="props.refresh()">
                <option v-for="(item, i) in filtersAssessors" :key="i" :value="item.value">
                  Asesor : {{ item.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div slot="action-select" slot-scope="props">
        <button class="btn btn-sm btn-danger" @click="props.deleteItem(props.getChecked(e => e.user_id))">
          <font-awesome-icon :icon="['fas', 'times']" class="tw-mx-1" /> Hilangkan Item
        </button>
      </div>
      <div slot="row" slot-scope="props" class="tw-flex-1">
        <div class="list-datatables-item">
          <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
            <div class="main">
              {{ props.row.accession.name }} <small>({{ props.row.accession.email }}) ({{ props.row.accession.phone }})</small>
            </div>
            <div class="tw-text-sm text-muted">
              <!-- {{ props.row.request.user_email }} - [{{ props.row.request.user_phone }}] -->
              <div>
                Asesor : {{ props.row.assessor.name }} | Admin : {{ props.row.admin.name }} |
                Jadwal : {{ props.row.schedule.title }} | Ruangan : {{ props.row.room.name }}
              </div>
            </div>
          </div>
          <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
            <button class="btn btn-sm btn-danger btn-rounded" style="padding: 6px 10px 5px 10px;" @click="props.deleteItem(props.row.id)">
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </div>
        </div>
      </div>
      <div slot="footer" slot-scope="props">
        <div class="tw-flex tw-flex-row">
          <div class="dropdown dropup">
            <Button text="CETAK" :styles="[ 'big', 'blue' ]" class="dropdown-toggle" data-bs-toggle="dropdown" />
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a :href="`${$axios.defaults.baseURL}/admin/schemas/${schema.id}/pdf?document=news_report&${convertFiltersToQuery(props.filters)}&token=${$auth.getToken()}`" target="_blank" class="dropdown-item">
                  <font-awesome-icon :icon="['fas', 'file-import']" class="tw-mr-2 tw-text-sm" />
                  <span>Berita Acara</span>
                </a>
              </li>
              <li>
                <!-- <a href="#" class="dropdown-item" @click="printDocument = 'list_of_attendees'">
                  <font-awesome-icon :icon="['fas', 'file-export']" class="tw-mr-2 tw-text-sm" />
                  <span>Daftar Hadir</span>
                </a> -->
                <a :href="`${$axios.defaults.baseURL}/admin/schemas/${schema.id}/pdf?document=list_of_attendees&${convertFiltersToQuery(props.filters)}&token=${$auth.getToken()}`" target="_blank" class="dropdown-item">
                  <font-awesome-icon :icon="['fas', 'file-export']" class="tw-mr-2 tw-text-sm" />
                  <span>Daftar Hadir</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ListTable>
    <div v-if="printDocument">
      <AdminSchemaAccessionPrintListOfAttendees v-if="printDocument = 'list_of_attendees'" @close="printClose" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, useContext } from '@nuxtjs/composition-api'
import { useSchemaFetch } from '@/api/schema.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup (_props, { refs }) {
    const { params, redirect, $overlayLoading, $axios, $sleep } = useContext()
    const { schemaId } = params.value
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const { schema } = useSchemaFetch(back)

    const filters = reactive({
      status: {
        'Belum Diputuskan': '',
        'Kompeten': 'Competent',
        'Tidak Kompeten': 'Incompetent'
      }
    })
    const filtersSchedules = ref([])
    const filtersPlaces = ref({})
    const filtersAssessors = ref([])
    const printDocument = ref(null)

    // funcs
    const convertFiltersToQuery = (filters) => {
      let res = ''
      res += 'filters=' + JSON.stringify(filters) + '&'
      return res
    }
    const printClose = () => {
      printDocument.value = null
    }

    //
    onMounted(async () => {
      $overlayLoading.show()
      const httpSchedules = (await getSchedules($axios, schemaId)).data.data
      const httpPlaces = (await getPlaces($axios, schemaId)).data.data
      const httpAssessors = (await getAssessors($axios, schemaId)).data.data

      // schedules
      const schedules = [{ value: 'all', text: 'Semua' }]
      for (let i = 0; i < httpSchedules.length; i++) {
        schedules.push({ value: httpSchedules[i].schedule_id, text: httpSchedules[i].title })
      }
      filtersSchedules.value = schedules

      // places
      const places = [{ value: 'all', text: 'Semua' }]
      for (let i = 0; i < httpPlaces.length; i++) {
        places.push({ value: httpPlaces[i].id, text: httpPlaces[i].name })
      }
      filtersPlaces.value = places

      // assessors
      const assessors = [{ value: 'all', text: 'Semua' }]
      for (let i = 0; i < httpAssessors.length; i++) {
        assessors.push({ value: httpAssessors[i].user_id, text: httpAssessors[i].name })
      }
      filtersAssessors.value = assessors

      await $sleep(500)
      $overlayLoading.hide()
    })

    return {
      back,
      convertFiltersToQuery,
      schema,
      filters,
      filtersSchedules,
      filtersPlaces,
      filtersAssessors,

      printDocument,
      printClose,
    }
  }
}

function getAssessors ($axios, schemaId) {
  return $axios({
    method: 'GET',
    url: `/admin/schemas/${schemaId}/assessors`,
  })
}

function getPlaces ($axios, schemaId) {
  return $axios({
    method: 'GET',
    url: `/admin/schemas/${schemaId}/rooms`,
  })
}

function getSchedules ($axios, schemaId) {
  return $axios({
    method: 'GET',
    url: `/admin/schemas/${schemaId}/schedules`
  })
}
</script>
