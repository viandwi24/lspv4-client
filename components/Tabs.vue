<template>
  <div class="tabs" :class="{'tabs__light': mode === 'light', 'tabs__dark': mode === 'dark'}">
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="{ 'tab__selected': (index == selectedIndex) }"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  component: true,
  props: {
    mode: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      selectedIndex: 0,
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.selectTab(0)
  },
  methods: {
    selectTab (i) {
      this.$emit('tabChange', i)
      this.selectedIndex = i
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
  }
}
</script>

<style lang="css">
  .tabs {
    width: 100%;
    flex: 1 1 0%;
    /* height: 100%;
    max-height: 100%; */
    display: flex;
    flex-direction: column;
  }
  .tab {
    position: relative;
    display: block;
    color: black;
    padding: 20px;
    width: 100%;
    flex: 1 1 0%;
    max-height: 100%;
    overflow-y: auto;
  }
  .tab__no_padding {
    padding: 0;
  }
  .tab__flex {
    display: flex;
    flex-direction: column;
  }
  ul.tabs__header {
    display: flex;
    list-style: none;
    margin: 0 0 0 20px;
    padding: 0;
    overflow-x: auto;
  }
  ul.tabs__header > li {
    @apply tw-truncate tw-overflow-ellipsis;
    min-width: 150px;
    text-align: center;
    padding: 15px 30px;
    margin: 0;
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
    border-radius: 10px 10px 0 0;
    border: 1px solid theme('colors.gray.100');
    border-bottom: none;
  }
  ul.tabs__header > li.tab__selected {
    padding: 15px 30px;
    font-weight: bold;
  }
  .tabs__light .tab{
    background-color: theme('colors.white');
  }
  .tabs__light li {
    background-color: #ddd;
    color: #aaa;
  }
  .tabs__light li.tab__selected {
    background-color: #fff;
    color: theme('colors.gray.600');
  }
  .tabs__dark .tab{
    background-color: #555;
    color: #eee;
  }
  .tabs__dark li {
    background-color: #ddd;
    color: #aaa;
  }
  .tabs__dark li.tab__selected {
    background-color: #555;
    color: white;
  }
</style>
