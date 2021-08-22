<template>
  <div class="content panel tw-flex tw-flex-col">
    <div class="panel-breadcrumb">
      <Breadcrumb />
    </div>
    <div class="panel-title tw-w-full tw-mt-4">
      <div class="ribbon">
        <h2>ASESOR</h2>
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
  middleware: ['auth', 'is_assessor'],
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
      name: 'Asesi Saya',
      link: '/assessor/assessments',
      icon: ['fas', 'list-alt']
    },
    {
      name: 'Profil Saya',
      link: '/assessor/profile',
      icon: ['fas', 'user']
    },
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
