<template>
  <div />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  middleware: 'auth',
  transition: 'default',
  setup () {
    // const { $auth, redirect } = useContext()
    // onMounted(() => {
    //   if ($auth.loggedIn) {
    //     const role = $auth.user.role
    //     const route = (role === 'Accession' ? 'Accession' : (role === 'assessor' ? 'Asesor' : 'Admin'))
    //     redirect({ name: (route).toLowerCase() })
    //   }
    // })
    return {}
  }
})
</script>
