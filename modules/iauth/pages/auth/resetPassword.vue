<script setup lang="ts">
import { reactive, ref } from 'vue'


definePageMeta({
  // middleware: 'auth',  //layout: '-bg',
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
  <div class="sign-bg tw-max-w-[90vw] sm:tw-max-w-md tw-mx-auto tw-h-screen">
    <div class="tw-flex tw-items-center tw-justify-center tw-h-full" >
      <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
          <h1
            class="tw-text-[18px] tw-leading-none tw-font-medium tw-text-slate-500 tw-mb-5"
          >
            {{ Helper.tLang('auth.reset.title') }}
          </h1>
          <div class="tw-w-full tw-flex-1 tw-p2 tw-animate-fade-in">
            <div class="">
              <q-form @submit.prevent.stop="reset" ref="refReset">
                <q-input
                    dense
                    outlined
                    class="tw-mb-0 lg:tw-mb-2"
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
                  <q-btn
                    :disabled="!auth.username"
                    type="submit"
                    class="glossy tw-tracking-widest"
                    color="primary"
                    unelevated
                    no-caps
                  >
                    <span class="tw-ml-3">
                      {{ Helper.tLang('auth.reset.submitBtn') }}
                    </span>
                  </q-btn>
                </transition>
              </q-form>
              <div class="max-[400px]:tw-flex-col tw-flex tw-items-center justify-center tw-mt-8 tw-gap-4">
                <p class="tw-text-slate-700 tw-text-sm tw-font-light tw-text-center">
                  {{ Helper.tLang('auth.register.existAccount.content') }}
                </p>
                <NuxtLink :to="getPath('iauth.register')">
                  <q-btn
                      class="btn-register !tw-font-normal !tw-capitalize !tw-text-[#64748b] tw-rounded-md"
                      color="#64748b"
                      size="md"
                      flat
                  >
                    {{ Helper.tLang('auth.register.existAccount.link') }}
                  </q-btn>
                </NuxtLink>
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
