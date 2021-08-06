<template>
  <div />
</template>

<script>
import { onMounted, useContext } from '@nuxtjs/composition-api'
export default {
  layout: 'page',
  // middleware: 'guest',
  transition: 'page',
  setup () {
    const { redirect, $auth, $sleep } = useContext()
    onMounted(async () => {
      $auth.logout()
      await $sleep(1000)
      redirect('/')
    })
  }
}
</script>
