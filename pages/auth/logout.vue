<script setup lang="ts">
import { reactive, ref } from 'vue'

const store = useAuthStore()
definePageMeta({
  middleware: 'auth',
})

onMounted(() => {
  store.logout()
})
</script>

<template>
  <div>
    <h1>logout page</h1>
  </div>
</template>

<style scoped></style>
