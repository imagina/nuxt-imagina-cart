<script setup lang="ts">
import { reactive, ref } from 'vue'

const authStore = useAuthStore()
definePageMeta({
  //middleware: 'auth',
})

onMounted(() => {
  authStore.logout()
})
</script>

<template>
  <q-inner-loading
      :showing="authStore.loading"
      :label="$t('iauth.loading.logout')"
      color="primary"
  />
</template>

<style scoped>
</style>
