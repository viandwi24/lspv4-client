<template>
  <div />
</template>

<script>
import { onMounted, useContext } from '@nuxtjs/composition-api'
export default {
  middleware: ['auth', 'userMustBeVerified'],
  transition: 'default',
  setup () {
    const { $auth, redirect } = useContext()
    onMounted(() => {
      if ($auth.loggedIn) {
        const role = $auth.user.role
        const route = (role === 'Accession' ? 'Accession' : (role === 'assessor' ? 'Asesor' : 'Admin'))
        redirect({ name: (route).toLowerCase() })
      } else {
        redirect('/')
      }
    })
    return {}
  }
}
</script>
