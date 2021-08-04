<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="Jadwal" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>JADWAL SKEMA</h2>
      </div>
      <div />
    </div>
    <ListTable v-if="schema" :soft-deletes="true" :url="`/admin/schemas/${schema.id}/schedules`" :filters="{ perPage: 10, sort: 'all', status: 'all', order: 'desc', search: '' }">
      <div slot="action" slot-scope="props">
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
                Tampilkan : {{ i }}
              </option>
            </select>
            <select v-model="props.filters.sort" class="form-control" @change="props.refresh()">
              <option v-for="(item, i) in filters.sort" :key="i" :value="item">
                Filter : {{ i }}
              </option>
            </select>
          </div>
          <div class="tw-w-full tw-my-1 tw-mx-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/4 form-group tw-flex tw-space-x-2">
            <input v-model="props.filters.search" type="text" class="form-control" placeholder="Cari..." @change="props.refresh()">
            <button class="btn btn-secondary" @click="props.refresh()">
              <font-awesome-icon :icon="['fas', 'sync']" />
            </button>
          </div>
        </div>
      </div>
      <div slot="action-select" slot-scope="props">
        <div v-if="props.filters.status == 'deleted'">
          <button class="btn btn-sm btn-warning" @click="props.restoreItem(props.getChecked())">
            <font-awesome-icon :icon="['fas', 'undo']" class="tw-mx-1" />
            Kembalikan Item
          </button>
          <button class="btn btn-sm btn-danger" @click="props.deleteItem(props.getChecked(), true)">
            <font-awesome-icon :icon="['fas', 'trash']" class="tw-mx-1" />
            Hapus Permanen Item
          </button>
        </div>
        <div v-else>
          <button class="btn btn-sm btn-danger" @click="props.deleteItem(props.getChecked())">
            <font-awesome-icon :icon="['fas', 'trash']" class="tw-mx-1" />
            Hapus Item
          </button>
        </div>
      </div>
      <div slot="row" slot-scope="props" class="tw-flex-1">
        <div class="list-datatables-item">
          <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
            <div class="main">
              {{ props.row.title }}
            </div>
            <div class="tw-text-sm text-muted">
              {{ $formattedDate(props.row.date_start, '/') }} - {{ $formattedDate(props.row.date_end, '/') }}
            </div>
          </div>
          <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
            <div v-if="props.row.deleted_at">
              <button class="btn btn-sm btn-warning btn-rounded" style="padding: 6px 10px 5px 10px;" @click="props.restoreItem(props.row.id)">
                <font-awesome-icon :icon="['fas', 'undo']" />
                <span>Kembalikan</span>
              </button>
              <button class="btn btn-sm btn-danger btn-rounded" style="padding: 6px 10px 5px 10px;" @click="props.deleteItem(props.row.id, true)">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
            <div v-else>
              <NuxtLink :to="{ name: 'admin-schemas-schemaId-manage-schedules-scheduleId-edit', params: { schemaId: schema.id, scheduleId: props.row.id } }" class="btn btn-sm btn-warning btn-rounded" tag="button" style="padding: 6px 9px 5px 9px;">
                <font-awesome-icon :icon="['fas', 'pen']" />
              </NuxtLink>
              <button class="btn btn-sm btn-danger btn-rounded" style="padding: 6px 10px 5px 10px;" @click="props.deleteItem(props.row.id)">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="tw-flex tw-flex-row">
          <Button text="TAMBAH" :styles="[ 'big', 'blue' ]" :icon="['fas', 'plus']" :to="{ name: 'admin-schemas-schemaId-manage-schedules-create' }" />
        </div>
      </div>
    </ListTable>
  </div>
</template>

<script>
import { useCrud } from '@/api/crud.js'
import { reactive, ref, useContext, useFetch } from '@nuxtjs/composition-api'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { params, redirect, $overlayLoading } = useContext()
    const { schemaId } = params.value
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const { show } = useCrud('/admin/schemas')
    const schema = ref(null)
    const filters = reactive({
      sort: {
        Semua: 'all',
        'Hanya Tahun Ini': 'thisyear'
      },
      status: {
        Semua: 'all',
        Terhapus: 'deleted'
      }
    })

    // fecth
    const { fetch } = useFetch(async () => {
      $overlayLoading.show()
      try {
        // form
        const result = await show(schemaId)
        const data = result.data.data
        schema.value = data
      } catch (error) {
        back()
      }
      $overlayLoading.hide()
    })
    fetch()

    // funcs

    // return
    return {
      back,
      schema,
      filters
    }
  }
}
</script>
