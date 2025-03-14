<script setup lang="ts">
import { reactive, ref } from 'vue'


definePageMeta({
  // middleware: 'auth',
  //layout: 'dark-bg',
})
const refReset: any = ref(null)
const isPwd = ref(true)
const store = useAuthStore()

const auth = reactive<{
  username: string
}>({
  username: '',
})
const loading = computed(() => store.loading)
async function reset() {
  try {
    const validateReset = await refReset.value.validate()
    if (!validateReset) return
    await store.resetPassword(auth)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div
    class="sign-bg tw-min-h-screen tw-text-gray-900 tw-flex tw-justify-center"
  >
    <div
      class="tw-max-w-screen-xl tw-m-0 sm:tw-m-10 sm:tw-rounded-lg tw-flex tw-justify-center tw-flex-1"
    >
      <div class="tw-p-6 sm:tw-p-12">
        <div class="tw-mt-12 tw-flex tw-flex-col tw-items-center">
          <div class="tw-mb-8">
            
          </div>
          <h1
            class="tw-text-[35px] xl:tw-text-[50px] tw-font-extralight tw-text-center tw-leading-tight tw-text-white tw-mb-4"
          >
            {{ Helper.tLang('auth.reset.title') }}
          </h1>
          <div class="tw-w-full tw-flex-1">
            <div class="">
              <q-form @submit.prevent.stop="reset" ref="refReset">
                <q-input
                  filled
                  dark
                  class="tw-mb-3"
                  v-model="auth.username"
                  :label="Helper.tLang('auth.register.inputs.email')"
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Correo es requerido.',
                    (val) =>
                      /.+@.+\..+/.test(val) || 'Ingrese un correo válido',
                  ]"
                >
                  <template v-slot:prepend>
                    
                  </template>
                </q-input>
                <transition name="hero">
                  <Button
                    :disabled="!auth.username"
                    type="submit"
                    class="hero tw-mt-5 tw-tracking-wide tw-font-semibold tw-bg-indigo-500 tw-text-gray-100 tw-w-full tw-py-4 tw-rounded-lg tw-hover:bg-indigo-700 tw-transition-all tw-duration-300 tw-ease-in-out tw-flex tw-items-center tw-justify-center"
                  >
                    <span class="tw-ml-3">
                      {{ Helper.tLang('auth.reset.submitBtn') }}
                    </span>
                  </Button>
                </transition>
              </q-form>
              <p
                class="tw-mt-8 tw-text-sm tw-font-extralight tw-text-white tw-text-center"
              >
                {{ Helper.tLang('auth.register.existAccount.content') }}
                <NuxtLink to="/auth/login" class="tw-text-primary tw-ml-1">
                  {{ Helper.tLang('auth.register.existAccount.link') }}
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  view-transition-name: article-thumb;
}
</style>
