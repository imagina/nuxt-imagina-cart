<script setup lang="ts">
import { reactive, ref } from 'vue'

const store = useAuthStore()
definePageMeta({
  //middleware: 'auth',
})

onMounted(() => {
  store.logout()
})
</script>

<template>
</template>

<style scoped>
.hero {
  transition: all 1s ease;
  view-transition-name: article-thumb;
}

.hero-enter-active,
.hero-leave-active {
  transition: all 1s ease;
}

.hero-enter,
.hero-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.shadow-form{
  box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.08), 0px 3.8px 33px rgba(0, 0, 0, 0.04), 0px 0.8px 8.4px rgba(0, 0, 0, 0.02);
}
</style>
