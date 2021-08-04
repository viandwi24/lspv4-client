<template>
  <div />
</template>

<script>
export default {
  middleware: ['auth', 'userMustBeVerified'],
  transition: 'default',
  created () {
    if (this.$auth.loggedIn) {
      const role = this.$auth.user.role
      const route = (role === 'Accession' ? 'Accession' : (role === 'assessor' ? 'Asesor' : 'Admin'))
      this.$router.push({ name: (route).toLowerCase() })
    } else {
      this.$router.push('/')
    }
  }
}
</script>
