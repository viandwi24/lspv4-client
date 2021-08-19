<template>
  <nav class="breadcrumbs tw-bg-gray-200 tw-px-1 tw-rounded tw-font-sans tw-w-full">
    <nav aria-label="breadcrumb" class="tw-py-1 tw-px-4">
      <ol class="breadcrumb">
        <li v-for="(item, i) in dataBuilded" :key="i" class="breadcrumb-item" :class="{ 'active': (item.page), 'tw-flex-1': (item.page) }">
          <NuxtLink v-if="item.type == 'text' && item.link" :to="item.link" tag="a" v-text="item.text" />
          <a v-else-if="item.type == 'text' && item.onclick" @click.prevent="item.onclick()" v-text="item.text" />
          <span v-else-if="item.type == 'text'" class="" v-text="item.text" />
        </li>
      </ol>
    </nav>
  </nav>
</template>

<script>
import { computed, onMounted } from '@vue/composition-api'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    home: {
      type: Boolean,
      default: true
    },
    page: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
    const buildData = (datas, home = true, page = undefined) => {
      const result = []

      // home
      if (home) {
        result.push(Object.assign({ type: 'text' }, { text: 'Home', link: '/dashboard' }))
        // result.push({ type: 'divider' })
      }

      // data build
      datas.forEach((data) => {
        result.push(Object.assign({ type: 'text' }, data))
        // result.push({ type: 'divider' })
      })

      // page
      if (page) {
        result.push(Object.assign({ type: 'text', page: true }, { text: page }))
      }

      // if last is divider
      if (result[result.length - 1].type === 'divider') {
        result.pop()
      }
      return result
    }
    const dataBuilded = computed(() => {
      return buildData(props.data, props.home, props.page)
    })
    onMounted(() => {
      // const result = buildData(props.data)
    })
    return {
      dataBuilded
    }
  }
}
</script>

<style lang="scss">
.breadcrumb {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  margin: 0;
  & > li {
    color: theme('colors.gray.500') !important;
    display: inline;
    max-width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:last-child {
      max-width: 100%;
    }

    & > a {
      color: theme('colors.blue.400') !important;
      cursor: pointer;
      text-decoration: none;
      font-weight: 600;
      &:hover {
        text-decoration: underline !important;
      }
    }
  }
}

@media screen and (max-height: 800px) {
  nav.breadcrumbs {
    display: none;
  }
}
</style>
