<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb />
    </div>
    <div class="panel-title tw-w-full tw-mt-4">
      <div class="ribbon">
        <h2>ADMIN</h2>
      </div>
    </div>
    <div class="tw-flex-1 tw-flex tw-flex-col tw-w-full">
      <div class="tw-flex-1 tw-flex tw-flex-row tw-mb-20 tw-justify-center">
        <div class="button-menu tw-flex tw-flex-col tw-justify-center">
          <Button
            v-for="(item, i) in menus"
            :key="i"
            :text="item.name"
            :styles="['big', 'blue']"
            :icon="item.icon"
            @click.native.prevent="selectMenu(item.link)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive, useContext
} from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'page',
  middleware: ['auth', 'is_admin'],
  transition: 'page',
  setup () {
    // setup
    const { menus, selectMenu } = useMenu()

    return {
      menus,
      selectMenu
    }
  }
})

function useMenu () {
  // setup
  const { redirect } = useContext()

  // vars
  const menus = reactive([
    {
      name: 'Jadwal Acara',
      link: '/admin/schedules',
      icon: ['fas', 'calendar-alt']
    },
    {
      name: 'Tempat Uji',
      link: '/admin/places',
      icon: ['fas', 'building']
    },
    {
      name: 'Skema',
      link: '/admin/schemas',
      icon: ['fas', 'list-alt']
    },
    {
      name: 'User',
      link: '/admin/users',
      icon: ['fas', 'user-friends']
    },
    {
      name: 'Pengumuman',
      link: '/admin/announcements',
      icon: ['fas', 'bell']
    }
  ])

  // methods
  const selectMenu = (url) => {
    redirect(url)
  }

  // return
  return {
    menus,
    selectMenu
  }
}
</script>

<style lang="scss" scoped>
.button-menu {
  width: 300px;
}
</style>
