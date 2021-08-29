<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb page="User" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>USER</h2>
      </div>
      <div />
    </div>
    <ListTable :soft-deletes="true" url="/admin/users" :filters="{ perPage: 10, order: 'desc', role: 'all', status: 'all', search: '' }">
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
            <select v-model="props.filters.role" class="form-control" @change="props.refresh()">
              <option v-for="(item, i) in filters.role" :key="i" :value="item">
                Role : {{ i }}
              </option>
            </select>
            <select v-model="props.filters.status" class="form-control" @change="props.refresh()">
              <option v-for="(item, i) in filters.status" :key="i" :value="item">
                Status : {{ i }}
              </option>
            </select>
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
              {{ props.row.name }}
              <span v-if="props.row.status != 'Active'" class="tw-text-red-500">[{{ props.row.status }}]</span>
            </div>
            <div class="tw-text-sm text-muted">
              <span v-if="props.filters.role == 'all'" class="badge badge-sm bg-primary">{{ props.row.role }}</span>
              {{ props.row.email }} - [{{ props.row.phone }}]
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
              <NuxtLink :to="{ name: 'admin-users-userId-edit', params: { userId: props.row.id } }" class="btn btn-sm btn-warning btn-rounded" tag="button" style="padding: 6px 9px 5px 9px;">
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
          <div class="dropdown dropup">
            <Button text="MENU" :styles="[ 'big', 'blue' ]" class="dropdown-toggle" data-bs-toggle="dropdown" />
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <NuxtLink :to="{ name: 'admin-users-create' }" tag="a" class="dropdown-item">
                  <font-awesome-icon :icon="['fas', 'plus']" class="tw-mr-2 tw-text-sm" />
                  <span>Tambah User</span>
                </NuxtLink>
              </li>
              <!-- <li><hr class="dropdown-divider"></li>
              <li>
                <NuxtLink :to="{ name: 'admin-users-create' }" tag="a" class="dropdown-item">
                  <font-awesome-icon :icon="['fas', 'file-import']" class="tw-mr-2 tw-text-sm" />
                  <span>Import User</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{ name: 'admin-users-create' }" tag="a" class="dropdown-item">
                  <font-awesome-icon :icon="['fas', 'file-export']" class="tw-mr-2 tw-text-sm" />
                  <span>Export User</span>
                </NuxtLink>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </ListTable>
  </div>
</template>

<script>
export default {
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  data () {
    return {
      filters: {
        role: {
          Semua: 'all',
          Admin: 'Admin',
          Asesi: 'Accession',
          Asesor: 'Assessor'
        },
        status: {
          Semua: 'all',
          Aktif: 'Active',
          'Tidak Aktif': 'Inactive',
          Suspend: 'Suspended',
          Terhapus: 'deleted'
        }
      }
    }
  },
  methods: {
    back () {
      this.$router.push('/admin')
    }
  }
}
</script>
