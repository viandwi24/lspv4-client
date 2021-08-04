<template>
  <div />
</template>

<script>
export default {
  middleware: 'auth',
  async mounted () {
    try {
      await this.$auth.logout()
    } catch (e) {
      return this.$router.push('/auth/login')
    }
    this.$router.push('/')
  }
}
</script>
