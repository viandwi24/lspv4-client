<template>
  <div class="collapsible">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.collapsible {
  @apply tw-shadow;
  border-radius: 4px;
  border: 1px solid theme('colors.gray.400');
  background: theme('colors.gray.50');
  position: relative;
  overflow: hidden;

  .collapsible_item {
    & > .collapsible_item___header {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      border-top: 1px solid theme('colors.gray.400');
      border-bottom: 1px solid theme('colors.gray.400');
      background: theme('colors.gray.100');
      font-weight: 700;
      padding: .6rem 1.5rem;
      & > .collapsible_item___header_icon {
        display: flex;
        margin-right: .5rem;
        font-size: .8rem;
        & > svg {
          align-self: center;
        }
      }
    }

    & > .collapsible_item___content {
      padding: .2rem;
    }

    &:first-child {
      & > .collapsible_item___header {
        border-top: none;
      }
    }
  }
}

@screen md {
  .collapsible {
    .collapsible_item {
      & > .collapsible_item___content {
        padding: .6rem 1.5rem;
      }
    }
  }
}
</style>

