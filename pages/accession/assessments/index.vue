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
        <h2>ASESMEN SAYA</h2>
      </div>
      <div />
    </div>
    <Tabs @tabChange="onTabChange">
      <Tab title="Berlangsung" class="tab__flex tab__no_padding">
        <ListTable ref="table0" url="/accession/assessments" :filters="{ perPage: 10, order: 'desc', status: 'Approved', search: '' }">
          <div slot="action" slot-scope="props">
            <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
              <div class="tw-flex tw-flex-row tw-flex-1 tw-w-full md:tw-w-auto md:tw-flex-none tw-space-x-2 tw-mx-1">
                <div class="">
                  <button class="btn btn-secondary" @click="() => { props.filters.order = (props.filters.order == 'asc' ? 'desc' : 'asc'); props.refresh(); }">
                    <span :class="{ 'tw-text-gray-400': (props.filters.order == 'desc') }">▼</span>
                    <span :class="{ 'tw-text-gray-400': (props.filters.order != 'desc') }">▲</span>
                  </button>
                </div>
                <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
                  <select v-model="props.filters.perPage" class="form-control" @change="props.changePerPage(props.filters.perPage)">
                    <option v-for="(item, i) in props.entries" :key="i" :value="item">
                      Tampilkan {{ item }} item
                    </option>
                  </select>
                </div>
              </div>
              <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
              </div>
              <div class="tw-w-full tw-flex-1 tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/4 tw-mx-1 form-group tw-flex tw-space-x-2">
                <input v-model="props.filters.search" type="text" class="form-control" placeholder="Cari..." @change="props.refresh()">
                <button class="btn btn-secondary" @click="props.refresh()">
                  <font-awesome-icon :icon="['fas', 'sync']" />
                </button>
              </div>
            </div>
          </div>
          <div slot="row" slot-scope="props" class="tw-flex-1">
            <div class="list-datatables-item">
              <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
                <div class="main">
                  {{ props.row.schema.title }}
                </div>
                <div class="tw-text-sm text-muted">
                  <div>
                    Tanggal Melakukan Permohonan : {{ $moment(props.row.created_at).format('DD-MM-YYYY HH:MM:SS').toString() }}
                  </div>
                  <div>
                    Status Permohonan : <span class="badge badge-sm bg-success">Sudah Disetujui</span>
                  </div>
                  <div>
                    Status Keputusan :
                    <span v-if="props.row.assessment.status === null" class="badge badge-sm bg-warning">Belum Diputuskan</span>
                    <span v-else-if="props.row.assessment.status === 'Competent'" class="badge badge-sm bg-success">Kompeten</span>
                    <span v-else-if="props.row.assessment.status === 'Incompetent'" class="badge badge-sm bg-danger">Tidak Kompeten</span>
                  </div>
                </div>
              </div>
              <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
                <NuxtLink
                  tag="button"
                  class="btn btn-sm btn-primary btn-rounded"
                  style="padding: 6px 10px 5px 10px;"
                  :to="{
                    name: 'accession-assessments-assessmentId',
                    params: { assessmentId: props.row.assessment.id }
                  }"
                >
                  <font-awesome-icon :icon="['fas', 'feather-alt']" />
                  <span>Masuk Ke Dashboard</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </ListTable>
      </Tab>
      <Tab title="Pending" class="tab__flex tab__no_padding">
        <ListTable ref="table1" url="/accession/assessments" :filters="{ perPage: 10, order: 'desc', status: 'Pending', search: '' }">
          <div slot="action" slot-scope="props">
            <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
              <div class="tw-flex tw-flex-row tw-flex-1 tw-w-full md:tw-w-auto md:tw-flex-none tw-space-x-2 tw-mx-1">
                <div class="">
                  <button class="btn btn-secondary" @click="() => { props.filters.order = (props.filters.order == 'asc' ? 'desc' : 'asc'); props.refresh(); }">
                    <span :class="{ 'tw-text-gray-400': (props.filters.order == 'desc') }">▼</span>
                    <span :class="{ 'tw-text-gray-400': (props.filters.order != 'desc') }">▲</span>
                  </button>
                </div>
                <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
                  <select v-model="props.filters.perPage" class="form-control" @change="props.changePerPage(props.filters.perPage)">
                    <option v-for="(item, i) in props.entries" :key="i" :value="item">
                      Tampilkan {{ item }} item
                    </option>
                  </select>
                </div>
              </div>
              <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
              </div>
              <div class="tw-w-full tw-flex-1 tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/4 tw-mx-1 form-group tw-flex tw-space-x-2">
                <input v-model="props.filters.search" type="text" class="form-control" placeholder="Cari..." @change="props.refresh()">
                <button class="btn btn-secondary" @click="props.refresh()">
                  <font-awesome-icon :icon="['fas', 'sync']" />
                </button>
              </div>
            </div>
          </div>
          <div slot="action-select" slot-scope="props">
            <button class="btn btn-sm btn-danger" @click="props.deleteItem(props.getChecked())">
              <font-awesome-icon :icon="['fas', 'trash']" class="tw-mx-1" />
              Batalkan Item
            </button>
          </div>
          <div slot="row" slot-scope="props" class="tw-flex-1">
            <div class="list-datatables-item">
              <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
                <div class="main">
                  {{ props.row.schema.title }}
                </div>
                <div class="tw-text-sm text-muted">
                  <div>
                    Tanggal Melakukan Permohonan : {{ $moment(props.row.created_at).format('DD-MM-YYYY HH:MM:SS').toString() }}
                  </div>
                  <div>
                    Status : <span class="badge badge-sm bg-warning">Menunggu Direview</span>
                  </div>
                </div>
              </div>
              <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
                <button class="btn btn-sm btn-danger btn-rounded" style="padding: 6px 10px 5px 10px;" @click="props.deleteItem(props.row.id)">
                  <font-awesome-icon :icon="['fas', 'times']" />
                  <span>Batalkan</span>
                </button>
              </div>
            </div>
          </div>
        </ListTable>
      </Tab>
      <Tab title="Ditolak" class="tab__flex tab__no_padding">
        <ListTable ref="table2" url="/accession/assessments" :filters="{ perPage: 10, order: 'desc', status: 'Rejected', search: '' }">
          <div slot="action" slot-scope="props">
            <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
              <div class="tw-flex tw-flex-row tw-flex-1 tw-w-full md:tw-w-auto md:tw-flex-none tw-space-x-2 tw-mx-1">
                <div class="">
                  <button class="btn btn-secondary" @click="() => { props.filters.order = (props.filters.order == 'asc' ? 'desc' : 'asc'); props.refresh(); }">
                    <span :class="{ 'tw-text-gray-400': (props.filters.order == 'desc') }">▼</span>
                    <span :class="{ 'tw-text-gray-400': (props.filters.order != 'desc') }">▲</span>
                  </button>
                </div>
                <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
                  <select v-model="props.filters.perPage" class="form-control" @change="props.changePerPage(props.filters.perPage)">
                    <option v-for="(item, i) in props.entries" :key="i" :value="item">
                      Tampilkan {{ item }} item
                    </option>
                  </select>
                </div>
              </div>
              <div class="tw-w-full tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-1 tw-flex-1 tw-flex tw-space-x-2">
              </div>
              <div class="tw-w-full tw-flex-1 tw-my-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/4 tw-mx-1 form-group tw-flex tw-space-x-2">
                <input v-model="props.filters.search" type="text" class="form-control" placeholder="Cari..." @change="props.refresh()">
                <button class="btn btn-secondary" @click="props.refresh()">
                  <font-awesome-icon :icon="['fas', 'sync']" />
                </button>
              </div>
            </div>
          </div>
          <div slot="row" slot-scope="props" class="tw-flex-1">
            <div class="list-datatables-item">
              <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
                <div class="main">
                  {{ props.row.schema.title }}
                </div>
                <div class="tw-text-sm text-muted">
                  <div>
                    Tanggal Melakukan Permohonan : {{ $moment(props.row.created_at).format('DD-MM-YYYY HH:MM:SS').toString() }}
                  </div>
                  <div>
                    Status : <span class="badge badge-sm bg-danger">Tidak Disetujui</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ListTable>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { defineComponent, useContext } from "@nuxtjs/composition-api"

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_accession'],
  transition: 'page',
  setup (_, { refs }) {
    const { redirect } = useContext()
    const back = () => redirect({ name: 'accession' })
    const onTabChange = (index) => {
      refs[`table${index}`].refresh()
    }
    return {
      back,
      onTabChange
    }
  }
})
</script>
