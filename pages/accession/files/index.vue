<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="File Saya" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>FILE SAYA</h2>
      </div>
      <div />
    </div>
    <ListTable ref="table" url="/accession/files" :filters="{ perPage: 10, order: 'desc', search: '' }">
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
      </div>
      <div slot="row" slot-scope="props" class="tw-flex-1">
        <div class="list-datatables-item">
          <div class="tw-flex-1" @click="props.toggleCheck(props.index)">
            <div class="main">
              {{ props.row.name }}
            </div>
            <div class="tw-text-sm text-muted">
              Ukuran : {{ $formatBytes(props.row.size) }} | Tipe : {{ props.row.type }}
            </div>
          </div>
          <div class="tw-self-center tw-flex tw-flex-row tw-space-x-2">
            <button class="btn btn-sm btn-danger btn-rounded" style="padding: 6px 10px 5px 10px;" @click="props.deleteItem(props.row.id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="tw-flex tw-flex-row">
          <input ref="file" type="file" style="display: none;" @change="fileChange">
          <Button text="TAMBAH FILE BARU" :styles="[ 'big', 'blue' ]" :icon="['fas', 'plus']" @click.native="add" />
        </div>
      </div>
    </ListTable>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { defineComponent, reactive } from '@vue/composition-api'
import { useCrud } from '@/api/crud'
export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_accession'],
  transition: 'page',
  setup (_, { refs }) {
    const { redirect, $swal } = useContext()
    const back = () => redirect({ name: 'accession' })
    const crud = useCrud('/accession/files')
    const filters = reactive({
      status: {
        Semua: 'all',
        Aktif: 'Active',
        'Tidak Aktif': 'Nonactive',
        Terhapus: 'deleted'
      }
    })
    let data = new FormData

    const add = () => refs.file.click()
    const fileChange = (e) => {
      if (e.target.files[0]) {
        data.append('file', e.target.files[0])
        const fsize = e.target.files[0].size;
        const file = Math.round((fsize / 1024));
        if (file > 30720) {
          $swal({
            title: 'File terlalu besar',
            text: 'File yang diupload tidak boleh lebih dari 30 MB',
            icon: 'error',
          })
        } else {
          upload()
        }
      }
      e.target.value = ''
      data = new FormData
    }
    const upload = async () => {
      await crud.create({
        data,
        text: 'Yakin ingin menguplod file ini?',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      refs.table.refresh()
    }

    return {
      filters,
      back,
      add,
      upload,
      fileChange
    }
  }
})
</script>
