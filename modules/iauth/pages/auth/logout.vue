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
  <div class="tw-max-w-[90vw] sm:tw-max-w-xl xl:tw-max-w-2xl tw-mx-auto tw-h-screen">
    <div class="tw-flex tw-items-center tw-justify-center tw-h-full">
      <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
        <h1
            class="tw-text-3xl md:tw-text-[35px] xl:tw-text-[50px] tw-leading-none tw-font-medium tw tw-text-primary tw-capitalize tw-mb-2 lg:tw-mb-4"
        >
          {{ Helper.tLang('auth.login.title') }}
        </h1>
        <p class="tw-text-primary tw-mb-7 md:tw-mb-14 tw-text-base md:tw-text-lg xl:tw-text-[20px] tw-font-extralight">
          {{ Helper.tLang('auth.login.subtitle') }}
        </p>
        <div class="tw-w-full tw-flex-1 shadow-form tw-p-6 sm:tw-p-14 tw-rounded-3xl tw-animate-fade-in">
          <div class="">
          </div>
        </div>
      </div>
    </div>
  </div>
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
