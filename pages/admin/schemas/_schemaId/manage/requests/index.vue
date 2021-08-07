<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Permohonan Asesmen" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>PERMOHONAN</h2>
      </div>
      <div />
    </div>
    <Tabs v-if="schema" @tabChange="onTabChange">
      <Tab title="Pending" class="tab__flex tab__no_padding">
        <ListTable v-if="schema" ref="table0" :url="tableUrl"  :filters="{ perPage: 10, order: 'desc', status: 'Pending', search: '' }">
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
              Hapus Item
            </button>
            <button class="btn btn-sm btn-primary" @click="bulkSelectView(props.getChecked())">
              <font-awesome-icon :icon="['fas', 'eye']" />
              Lihat Item
            </button>
          </div>
          <div slot="row" slot-scope="props" class="tw-flex-1">
            <div class="list-datatables-item">
              <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
                <div class="main">
                  {{ props.row.schema.title }}
                </div>
                <div class="tw-text-sm text-muted tw-flex tw-flex-col">
                  <div>
                    Oleh : {{ props.row.user_name }}
                  </div>
                  <div>
                    Pada : {{ $moment(props.row.created_at).format('DD-MM-YYYY HH:MM:SS').toString() }}
                  </div>
                </div>
              </div>
              <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
                <button class="btn btn-sm btn-danger btn-rounded" style="padding: 6px 10px 5px 10px;" @click="props.deleteItem(props.row.id)">
                  <font-awesome-icon :icon="['fas', 'times']" />
                  <span class="tw-hidden md:tw-inline">Hapus</span>
                </button>
                <button class="btn btn-sm btn-primary btn-rounded" style="padding: 6px 10px 5px 10px;" @click="selectedSchemaRequest = props.row.id">
                  <font-awesome-icon :icon="['fas', 'eye']" />
                  <span class="tw-hidden md:tw-inline">Lihat Permohonan</span>
                  <span class="tw-inline md:tw-hidden">Lihat</span>
                </button>
              </div>
            </div>
          </div>
        </ListTable>
      </Tab>
      <Tab title="Disetujui" class="tab__flex tab__no_padding">
        <ListTable v-if="schema" ref="table1" :url="tableUrl"  :filters="{ perPage: 10, order: 'desc', status: 'Approved', search: '' }">
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
            <button class="btn btn-sm btn-primary" @click="bulkSelectView(props.getChecked())">
              <font-awesome-icon :icon="['fas', 'eye']" />
              Lihat Item
            </button>
          </div>
          <div slot="row" slot-scope="props" class="tw-flex-1">
            <div class="list-datatables-item">
              <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
                <div class="main">
                  {{ props.row.schema.title }}
                </div>
                <div class="tw-text-sm text-muted tw-flex tw-flex-col">
                  <div>
                    Oleh : {{ props.row.user_name }}
                  </div>
                  <div>
                    Pada : {{ $moment(props.row.created_at).format('DD-MM-YYYY HH:MM:SS').toString() }}
                  </div>
                </div>
              </div>
              <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
                <button class="btn btn-sm btn-primary btn-rounded" style="padding: 6px 10px 5px 10px;" @click="selectedSchemaRequest = props.row.id">
                  <font-awesome-icon :icon="['fas', 'eye']" />
                  <span class="tw-hidden md:tw-inline">Lihat Permohonan</span>
                  <span class="tw-inline md:tw-hidden">Lihat</span>
                </button>
              </div>
            </div>
          </div>
        </ListTable>
      </Tab>
      <Tab title="Ditolak" class="tab__flex tab__no_padding">
        <ListTable v-if="schema" ref="table2" :url="tableUrl"  :filters="{ perPage: 10, order: 'desc', status: 'Rejected', search: '' }">
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
            <button class="btn btn-sm btn-primary" @click="bulkSelectView(props.getChecked())">
              <font-awesome-icon :icon="['fas', 'eye']" />
              Lihat Item
            </button>
          </div>
          <div slot="row" slot-scope="props" class="tw-flex-1">
            <div class="list-datatables-item">
              <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
                <div class="main">
                  {{ props.row.schema.title }}
                </div>
                <div class="tw-text-sm text-muted tw-flex tw-flex-col">
                  <div>
                    Oleh : {{ props.row.user_name }}
                  </div>
                  <div>
                    Pada : {{ $moment(props.row.created_at).format('DD-MM-YYYY HH:MM:SS').toString() }}
                  </div>
                </div>
              </div>
              <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
                <button class="btn btn-sm btn-primary btn-rounded" style="padding: 6px 10px 5px 10px;" @click="selectedSchemaRequest = props.row.id">
                  <font-awesome-icon :icon="['fas', 'eye']" />
                  <span class="tw-hidden md:tw-inline">Lihat Permohonan</span>
                  <span class="tw-inline md:tw-hidden">Lihat</span>
                </button>
              </div>
            </div>
          </div>
        </ListTable>
      </Tab>
    </Tabs>
    <AdminSchemaRequestView v-if="selectedSchemaRequest != null" :schema="schema" :schema-id="schemaId" :schema-request-id="selectedSchemaRequest" @close="onFormClose" />
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from "@nuxtjs/composition-api"
import { useSchemaFetch } from '@/api/schema.js'

export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_accession'],
  transition: 'page',
  setup (_, { refs }) {
    const { params, redirect } = useContext()
    const schemaId = parseInt(params.value.schemaId)
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const { schema } = useSchemaFetch(back)
    const tableUrl = `/admin/schemas/${schemaId}/requests`
    const onTabChange = (index) => {
      if (schema.value) {
        try { refs[`table${index}`].refresh() } catch (error) {}
      }
    }


    //
    const selectedSchemaRequest = ref(null)
    const onFormClose = () => {
      selectedSchemaRequest.value = null
      onTabChange(0)
      onTabChange(1)
      onTabChange(2)
    }
    const bulkSelectView = (ids) => {
      selectedSchemaRequest.value = ids
    }

    return {
      back,
      onTabChange,
      onFormClose,
      schemaId,
      schema,
      tableUrl,
      selectedSchemaRequest,
      bulkSelectView
    }
  }
})
</script>
