<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb :page="(schema) ? schema.title : ''" :data="[{ text: 'Skema', link: '/admin/schemas' }]" />
    </div>
    <div class="panel-title tw-py-2">
      <div class="nav tw-self-center">
        <button class="back" @click="back" />
      </div>
      <div class="ribbon">
        <h2>MANAJEMEN SKEMA</h2>
      </div>
      <div />
    </div>
    <div v-if="schema" class="panel-content tw-flex-1 tw-max-h-full tw-h-1 tw-flex tw-flex-col tw-p-0 md:tw-p-4 md:tw-pt-2">
      <div class="tw-hidden md:tw-grid tw-grid-cols-1 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-4 tw-mb-4">
        <div class="tw-relative tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-space-x-3 tw-bg-blue-200">
          <div class="tw-text-blue-500 tw-right-0 tw-bottom-0 tw-text-3xl tw-flex">
            <font-awesome-icon :icon="['fas', 'user-friends']" class="tw-self-center" />
          </div>
          <div>
            <div class="tw-text tw-text-gray-800 tw-font-semibold">Jumlah Asesi</div>
            <div class="tw-text-sm tw-text-gray-500">
              {{ schema.assessments_count }} Orang
            </div>
          </div>
        </div>
        <div class="tw-relative tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-space-x-3 tw-bg-red-200">
          <div class="tw-text-red-500 tw-right-0 tw-bottom-0 tw-text-3xl tw-flex">
            <font-awesome-icon :icon="['fas', 'user-secret']" class="tw-self-center" />
          </div>
          <div>
            <div class="tw-text tw-text-gray-800 tw-font-semibold">Jumlah Asesor</div>
            <div class="tw-text-sm tw-text-gray-500">
              {{ schema.assessors_count }} Orang
            </div>
          </div>
        </div>
        <div class="tw-relative tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-space-x-3 tw-bg-purple-200">
          <div class="tw-text-purple-500 tw-right-0 tw-bottom-0 tw-text-3xl tw-flex">
            <font-awesome-icon :icon="['fas', 'building']" class="tw-self-center" />
          </div>
          <div>
            <div class="tw-text tw-text-gray-800 tw-font-semibold">Jumlah Tempat</div>
            <div class="tw-text-sm tw-text-gray-500">
              {{ schema.places_count }} Tempat
            </div>
          </div>
        </div>
        <div class="tw-relative tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-space-x-3 tw-bg-pink-200">
          <div class="tw-text-pink-500 tw-right-0 tw-bottom-0 tw-text-3xl tw-flex">
            <font-awesome-icon :icon="['fas', 'calendar-alt']" class="tw-self-center" />
          </div>
          <div>
            <div class="tw-text tw-text-gray-800 tw-font-semibold">Jumlah Jadwal</div>
            <div class="tw-text-sm tw-text-gray-500">
              {{ schema.schedules_count }} Jadwal
            </div>
          </div>
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-flex-1 tw-max-h-full tw-h-1 tw-w-full tw-rounded-none md:tw-rounded-lg tw-bg-gray-200">
        <div class="tw-w-full tw-py-1 tw-px-4 tw-text-center tw-rounded-none md:tw-rounded-t-lg tw-bg-gray-300 tw-text-gray-700" v-text="(schema) ? schema.title : ''" />
        <div class="tw-flex-1 tw-w-full tw-overflow-y-auto">
          <div class="list-menu">
            <div
              v-for="(header, i) in listMenus"
              :key="i"
              class="list-menu-group"
            >
              <span class="list-menu-header">{{ header.text }}</span>
              <div class="list-menu-items">
                <div
                  v-for="(item, j) in listMenus[i].items"
                  :key="j"
                  class="list-menu-item"
                  @click.prevent="listMenuOnClick(item)"
                >
                  <div class="list-menu-icon">
                    <font-awesome-icon :icon="item.icon" />
                  </div>
                  <div class="list-menu-text">
                    {{ item.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud.js'
import Breadcrumb from '../../../../../components/Breadcrumb.vue'
export default {
  components: { Breadcrumb },
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    const { $overlayLoading, redirect, params } = useContext()
    const { show } = useCrud('/admin/schemas')
    const { schemaId } = params.value
    const back = () => {
      redirect('/admin/schemas')
    }
    const listMenus = [
      {
        text: 'General',
        items: [
          {
            text: 'Informasi Skema',
            icon: ['fas', 'cogs'],
            url: { name: 'admin-schemas-schemaId-manage-information-detail', params: { schemaId } }
          },
          {
            text: 'Unit Kompetensi',
            icon: ['fas', 'table'],
            url: { name: 'admin-schemas-schemaId-manage-competency-units', params: { schemaId } }
          },
          {
            text: 'Jadwal',
            icon: ['fas', 'calendar-alt'],
            url: { name: 'admin-schemas-schemaId-manage-schedules', params: { schemaId } }
          },
          {
            text: 'Tempat Uji',
            icon: ['fas', 'building'],
            url: { name: 'admin-schemas-schemaId-manage-places', params: { schemaId } }
          },
          {
            text: 'File Persyaratan',
            icon: ['fas', 'folder'],
            url: { name: 'admin-schemas-schemaId-manage-files', params: { schemaId } }
          },
          {
            text: 'Pemberitahuan',
            icon: ['fas', 'exclamation-triangle'],
            url: { name: 'admin-schemas-schemaId-manage-announcement', params: { schemaId } }
          }
        ]
      },
      {
        text: 'User',
        items: [
          {
            text: 'Asesor',
            icon: ['fas', 'user-friends'],
            url: { name: 'admin-schemas-schemaId-manage-assesors', params: { schemaId } }
          },
          {
            text: 'Asesi',
            icon: ['fas', 'user'],
            url: { name: 'admin-schemas-schemaId-manage-accessions', params: { schemaId } }
          },
          {
            text: 'Permohonan',
            icon: ['fas', 'list-alt'],
            url: { name: 'admin-schemas-schemaId-manage-requests', params: { schemaId } }
          }
        ]
      },
      {
        text: 'Pendukung',
        items: [
          {
            text: 'Pertanyaan Pendukung Observasi',
            icon: ['fas', 'list'],
            url: { name: 'admin-schemas-schemaId-manage-frai02', params: { schemaId } }
          },
        ]
      }
      // {
      //   text: 'Asesmen',
      //   items: [
      //     {
      //       text: 'Ruangan Pengawas',
      //       icon: ['fas', 'video']
      //     },
      //     {
      //       text: 'Hasil Asesmen',
      //       icon: ['fas', 'poll']
      //     },
      //     {
      //       text: 'Berita Acara',
      //       icon: ['fas', 'file-alt']
      //     },
      //     {
      //       text: 'Daftar Hadir',
      //       icon: ['fas', 'file-alt']
      //     }
      //   ]
      // },
      // {
      //   text: 'Formulir',
      //   items: [
      //     {
      //       text: 'Pertanyaan Tertulis',
      //       icon: ['fas', 'scroll']
      //     },
      //     {
      //       text: 'Pertanyaan Lisan',
      //       icon: ['fas', 'headset']
      //     }
      //   ]
      // }
    ]
    const schema = ref(null)

    // fetch
    const { fetch } = useFetch(async () => {
      const id = params.value.schemaId
      $overlayLoading.show()
      try {
        const res = await show(id)
        schema.value = res.data.data
      } catch (error) {
        back()
      }
      $overlayLoading.hide()
    })
    fetch()

    // methods
    const listMenuOnClick = (item) => {
      if (typeof item.url !== 'undefined') {
        redirect(item.url)
      }
    }

    return {
      back,
      listMenus,
      listMenuOnClick,
      schemaId,
      schema
    }
  }
}
</script>

<style lang="scss">
.list-menu {
  & > .list-menu-group {
    width: 100%;
    max-width: 100%;
    margin-bottom: .4rem;
    & .list-menu-header {
      display: block;
      position: relative;
      font-size: 18px;
      z-index: 1;
      overflow: hidden;
      text-align: center;
      margin-top: .6rem;
      margin-left: 1rem;
      margin-right: 1rem;
      color: theme('colors.gray.700');
      &:before, &:after {
        position: absolute;
        top: 51%;
        overflow: hidden;
        width: 48%;
        height: 1px;
        content: '\a0';
        background-color: theme('colors.gray.300');
        margin-left: 2%;
      }
      &:before {
        margin-left: -50%;
        text-align: right;
      }
    }

    & .list-menu-items {
      width: 100%;
      max-width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      grid-template-rows: repeat(auto-fill, minmax(115px, 1fr));
      padding: .4rem;

      @screen sm {
        grid-template-columns: repeat(3, minmax(150px, 1fr));
      }

      @screen md {
        grid-template-columns: repeat(4, minmax(150px, 1fr));
      }

      @screen xl {
        grid-template-columns: repeat(5, minmax(150px, 1fr));
      }

      @screen 2xl {
        grid-template-columns: repeat(6, minmax(150px, 1fr));
      }

      .list-menu-item {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
        cursor: pointer;
        border-radius: 0.5rem;
        animation: all 1s;
        background: theme('colors.blue.50');
        color: theme('colors.gray.800');
        margin: .4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        text-align: center;
        height: 110px;
        min-height: 110px;

        @screen md {
          height: auto;
        }

        & > .list-menu-icon {
          svg {
            font-size: 24px;
          }
        }
        & > .list-menu-text {
          font-size: 12px;
        }

        &:hover {
          @apply tw-shadow-xl tw-border-blue-500;
          border-width: 6px;
          background: theme('colors.blue.100');
          // color: theme('colors.gray.200');
        }
      }
    }
  }
}
</style>
