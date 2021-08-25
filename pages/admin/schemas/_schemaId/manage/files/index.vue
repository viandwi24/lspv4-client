<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="File Persyaratan" :data="[{text: 'Skema',link: '/admin/schemas'},{text: ((schema) ? schema.title : ''),onclick: back}]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>FILE PERSYARATAN</h2>
      </div>
      <div />
    </div>
    <ListTable v-if="schema" :url="`/admin/schemas/${schema.id}/files`" :filters="{ perPage: 10, order: 'desc', search: '' }">
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
          <div class="tw-w-full tw-flex-1 tw-my-1 tw-mx-1 md:tw-my-0 md:tw-w-1/2 lg:tw-w-1/4 form-group tw-flex tw-space-x-2">
            <input v-model="props.filters.search" type="text" class="form-control" placeholder="Cari..." @change="props.refresh()">
            <button class="btn btn-secondary" @click="props.refresh()">
              <font-awesome-icon :icon="['fas', 'sync']" />
            </button>
          </div>
        </div>
      </div>
      <div slot="action-select" slot-scope="props">
        <button class="btn btn-sm btn-danger" @click="props.deleteItem(props.getChecked(e => e.id))">
          <font-awesome-icon :icon="['fas', 'times']" class="tw-mx-1" /> Hilangkan Item
        </button>
      </div>
      <div slot="row" slot-scope="props" class="tw-flex-1">
        <div class="list-datatables-item">
          <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
            <div class="main">
              {{ props.row.name }}
            </div>
            <div class="tw-text-sm text-muted">
              <div>Format : {{ [...props.row.format].join(', ') }}</div>
              <div>User wajib Mengupload : {{ props.row.required ? 'Iya' : 'Tidak' }}</div>
            </div>
          </div>
          <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
            <button class="btn btn-sm btn-danger btn-rounded" style="padding: 6px 10px 5px 10px;" @click="props.deleteItem(props.row.id)">
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="tw-flex tw-flex-row">
          <Button text="TAMBAH" :styles="[ 'big', 'blue' ]" :icon="['fas', 'plus']" :to="{ name: 'admin-schemas-schemaId-manage-files-add' }" />
        </div>
      </div>
    </ListTable>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { useSchemaFetch } from '@/api/schema.js'
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { params, redirect } = useContext()
    const { schemaId } = params.value
    const back = () => redirect({ name: 'admin-schemas-schemaId-manage', params: { schemaId } })
    const { schema } = useSchemaFetch(back)

    return {
      back,
      schema
    }
  }
}
</script>
