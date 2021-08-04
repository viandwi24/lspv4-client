<template>
  <div />
</template>

<script>
import { onMounted, useContext } from '@nuxtjs/composition-api'
export default {
  transition: 'default',
  setup () {
    const { $auth, redirect } = useContext()
    onMounted(() => {
      if ($auth.loggedIn) {
        const role = $auth.user.role
        const route = (role === 'Accession' ? 'Accession' : (role === 'assessor' ? 'Asesor' : 'Admin'))
        if (!$auth.user.email_verified_at) {
          redirect({ name: 'auth-verification' })
        } else {
          redirect({ name: (route).toLowerCase() })
        }
      } else {
        console.log(redirect)
        redirect({ name: 'index' })
      }
    })
    return {}
  }
}
</script>
