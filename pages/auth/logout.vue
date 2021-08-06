<template>
  <div />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'page',
  // middleware: 'guest',
  transition: 'page',
  setup () {
    // const { redirect, $auth } = useContext()
    // onMounted(() => {
    //   $auth.logout().then(() => redirect('/')).catch(() => redirect('/dashboard'))
    // })
    return {}
  }
})
</script>
