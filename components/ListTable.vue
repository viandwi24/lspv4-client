<template>
  <div class="list-datatables tw-flex-1">
    <div class="tw-bg-gray-200 tw-px-4 tw-py-3 tw-flex tw-flex-col tw-space-y-2">
      <slot
        name="action"
        :filters="filters"
        :refresh="refresh"
        :runAjax="runAjax"
        :data="data"
        :entries="entries"
        :changePerPage="changePerPage"
        :instance="this"
        :setCheck="setCheck"
        :getCheck="getCheck"
        :toggleCheck="toggleCheck"
      />
      <div v-if="checkedCount > 0" class="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-space-x-2 tw-px-1 tw-space-y-2 md:tw-space-y-0">
        <div class="tw-text-sm tw-self-center">
          <span class="text-muted">{{ checkedCount }} item dipilih.</span>
          <a href="#" class="tw-text-blue-500 tw-no-underline hover:tw-text-blue-800 hover:tw-underline tw-transition-all tw-duration-150" @click.prevent="selectAllCheck">Pilih Semua</a>
          .
          <a href="#" class="tw-text-red-500 tw-no-underline hover:tw-text-red-800 hover:tw-underline tw-transition-all tw-duration-150" @click.prevent="removeAllCheck">Unselect</a>
        </div>
        <div class="tw-flex tw-flex-row tw-justify-center md:tw-flex-col tw-my-2 tw-pr-2">
          <slot
            name="action-select"
            :filters="filters"
            :refresh="refresh"
            :data="data"
            :checkedCount="checkedCount"
            :rows="rows"
            :deleteItem="deleteItem"
            :restoreItem="restoreItem"
            :checks="checks"
            :getChecked="getChecked"
            :instance="this"
            :setCheck="setCheck"
            :getCheck="getCheck"
            :toggleCheck="toggleCheck"
          />
        </div>
      </div>
    </div>
    <ul v-if="rows.length != 0" class="list-table">
      <li v-for="(item, i) in rows" :key="i" class="tw-flex tw-flex-row">
        <div class="form-check">
          <input :id="`list-table-check-${i}`" v-model="checks[i]" class="form-check-input" type="checkbox">
          <label class="form-check-label" :for="`list-table-check-${i}`" />
        </div>
        <slot
          name="row"
          :row="item"
          :refresh="refresh"
          :deleteItem="deleteItem"
          :restoreItem="restoreItem"
          :data="data"
          :instance="this"
          :setCheck="setCheck"
          :getCheck="getCheck"
          :toggleCheck="toggleCheck"
          :index="i"
        />
      </li>
    </ul>
    <div v-else class="tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-text-center">
      Tidak ada item.
    </div>
    <div class="tw-bg-gray-200 tw-px-4 tw-py-4 tw-flex tw-flex-row tw-justify-around">
      <div />
      <div class="tw-flex-1">
        <slot name="footer" :filters="filters" :refresh="refresh" :data="data" />
      </div>
      <div class="tw-self-center tw-flex tw-flex-row">
        <span class="tw-mr-4 tw-mt-2 tw-text-xs tw-text-gray-500">
          <span class="tw-hidden md:tw-inline">Halaman ke</span>
          <span class="tw-hidden sm:tw-inline">{{ page }} dari {{ maxPage }}</span>
        </span>
        <button class="back" :disabled="page == 1" @click="changePage('prev')" />
        <div class="tw-mx-4 tw-font-semibold tw-text-2xl">
          {{ page }}
        </div>
        <button class="next" :disabled="page == maxPage" @click="changePage('next')" />
      </div>
    </div>
    <div v-if="loading" class="overlay tw-absolute tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-center">
      <center>
        <font-awesome-icon :icon="['fas', 'circle-notch']" class="tw-text-gray-50 tw-text-8xl" spin />
      </center>
    </div>
  </div>
</template>

<script>
import { useCrud } from '@/api/crud.js'
export default {
  component: true,
  props: {
    softDeletes: {
      type: Boolean,
      default: false
    },
    showFilter: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: null
    },
    filters: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    url: {
      type: String,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: null
    }
  },
  data () {
    return {
      loading: true,
      isAjax: false,
      rows: [],
      checks: [],
      page: 1,
      perPage: 10,
      maxPage: 1,
      entries: [5, 10, 20, 50, 100, 500, 1000],
      crud: null
    }
  },
  computed: {
    checkedCount () {
      let res = 0
      for (let i = 0; i < this.checks.length; i++) {
        if (this.checks[i]) {
          res++
        }
      }
      return res
    }
  },
  watch: {
    checks (res) {
    }
  },
  mounted () {
    this.checkData()
    this.crud = useCrud(this.url, this)
  },
  methods: {
    setCheck (id, state = true) {
      try {
        document.querySelector('#list-table-check-' + id).click()
      } catch (error) {
      }
    },
    getCheck (id) {
      try {
        return document.querySelector('#list-table-check-' + id).checked
      } catch (error) {
        return false
      }
    },
    toggleCheck (id) {
      this.setCheck(id, !this.getCheck(id))
    },
    getChecked (func = e => e.id) {
      const ids = []
      for (let i = 0; i < this.checks.length; i++) {
        if (this.checks[i]) {
          ids.push(i)
        }
      }
      if (func != null) {
        const res = []
        for (let i = 0; i < ids.length; i++) {
          const tmp = func(this.rows[ids[i]])
          res.push(tmp)
        }
        return res
      }
      return ids
    },
    selectAllCheck () {
      const tmp = []
      for (let i = 0; i < this.checks.length; i++) {
        tmp[i] = true
      }
      this.checks = tmp
    },
    removeAllCheck () {
      const tmp = []
      for (let i = 0; i < this.checks.length; i++) {
        tmp[i] = false
      }
      this.checks = tmp
    },
    checkData () {
      if (this.data == null) {
        this.isAjax = true
      } else {
        this.rows = this.data
        this.loading = false
      }
      this.runAjax(this)
    },
    refresh () {
      const $this = this
      this.page = 1
      if (this.isAjax) {
        this.runAjax($this)
      } else {
        $this.refreshChecked()
      }
      // awe
    },
    runAjax ($this) {
      this.loading = true
      this.$axios({
        method: 'get',
        url: this.url,
        params: {
          filters: this.filters,
          meta: {
            page: this.page,
            perPage: this.perPage
          }
        }
      }).then((res) => {
        this.rows = res.data.data
        this.maxPage = (res.data.pagination.total_page === 0) ? 1 : res.data.pagination.total_page
      }).finally(function () {
        $this.loading = false
        $this.refreshChecked()
      })
    },
    refreshChecked () {
      const tmp = []
      for (let i = 0; i < this.rows.length; i++) {
        tmp.push(false)
      }
      this.checks = tmp
    },
    changePage (w = 'next') {
      if (w === 'next') {
        if (this.page < this.maxPage) {
          this.page++
        } else {
          return
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.page > 1) {
          this.page--
        } else {
          return
        }
      }
      this.runAjax(this)
    },
    changePerPage (a) {
      this.perPage = a
      this.refresh()
    },
    async deleteItem (id, destroy = false) {
      let text = ''
      let permanentDelete = false
      let ids
      if (Array.isArray(id)) {
        ids = id
      } else {
        ids = `${id}`.split(',')
      }
      if (this.softDeletes) {
        if (destroy) {
          text = `Kamu akan menghapus item dengan id ${ids.join(', ')} ? (Data akan di hapus permanen. Semua data yang bersangkutan akan terhapus juga!)`
          permanentDelete = true
        } else {
          text = `Kamu akan menghapus item dengan id ${ids.join(', ')} ? (Data di pindahkan ke tong sampah, kamu bisa mengembalikannya nanti)`
        }
      } else {
        text = `Kamu akan menghapus item dengan id ${ids.join(', ')} ?`
      }

      try {
        await this.crud.destroy(ids.join(','), permanentDelete, text)
        this.refresh()
      } catch (error) {
      }
    },
    async restoreItem (id) {
      let ids
      if (Array.isArray(id)) {
        ids = id
      } else {
        ids = `${id}`.split(',')
      }
      ids = ids.join(', ')
      const text = `Ingin mengembalikan data dengan id ${ids} ini dari tong sampah?`
      try {
        await this.crud.restore(ids, text)
        this.refresh()
      } catch (error) {
      }
    }
  }
}
</script>
