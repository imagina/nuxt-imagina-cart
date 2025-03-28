<script setup lang="ts">
import { reactive, ref } from 'vue'
import PasswordValidator from '@/utils/validators/passwordValidator'
import logo from "../../assets/images/red-logo-imagina.png"

const refLogin: any = ref(null)
const isPwd = ref(true)
const store = useAuthStore()
definePageMeta({
  // middleware: 'auth',
  //layout: 'dark-bg',
})
const auth = reactive<{
  username: string
  password: string
  remember_me: boolean
}>({
  username: '',
  password: '',
  remember_me: false,
})
const loading = computed(() => store.loading)

onMounted(() => {
  if (store.username) auth.username = store.username
  if (store.password) auth.password = store.password
})

async function login() {
  try {
    const validateLogin = await refLogin.value.validate()
    if (!validateLogin) return
    await store.login(auth)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="tw-max-w-[90vw] sm:tw-max-w-md tw-mx-auto tw-h-screen">
    <div class="tw-flex tw-items-center tw-justify-center tw-h-full">
      <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
        <div class="tw-mb-5">
          <img :src="logo" :alt="logo" class="tw-h-12 tw-w-12 tw-object-contain">
        </div>
        <h1
            class="tw-text-[18px] tw-leading-none tw-font-medium tw-text-slate-500 tw-mb-2"
        >
          {{ Helper.tLang('auth.login.title') }}
        </h1>
        <p class="tw-text-slate-500 tw-mb-3 tw-text-sm tw-font-light">
          {{ Helper.tLang('auth.login.subtitle') }}
        </p>
        <div class="tw-w-full tw-flex-1 tw-p-2 tw-animate-fade-in">
          <div class="">
            <q-form @submit.prevent.stop="login" ref="refLogin">
              <q-input
                  dense
                  outlined
                  class="tw-mb-0"
                  v-model="auth.username"
                  :label="Helper.tLang('auth.login.inputs.email')"
                  lazy-rules
                  :rules="[
                (val) => !!val || 'Correo es requerido.',
                (val) =>
                  /.+@.+\..+/.test(val) || 'Por favor ingrese un correo válido',
              ]"
              >
              </q-input>
              <q-input
                  dense
                  outlined
                  class="tw-mb-3"
                  v-model="auth.password"
                  :label="Helper.tLang('auth.login.inputs.password')"
                  lazy-rules
                  :rules="PasswordValidator.rules"
                  :type="isPwd ? 'password' : 'text'"
              >

                <template v-slot:append>
                  <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <div class="tw-flex tw-justify-between tw-flex-col sm:tw-flex-row tw-mb-3">
                <label class="tw-flex tw-items-center tw-mb-2">
                  <q-checkbox
                      class="tw-bg-input !tw-border-input"
                      v-model="auth.remember_me"
                  ></q-checkbox>
                  <span class="tw-ml-2 tw-text-sm lg:tw-text-md tw-text-slate-500">
                  {{ Helper.tLang('auth.login.inputs.rememberMe') }}
                </span>
                </label>
                <NuxtLink :to="getPath('iauth.resetPassword')">
                <q-btn
                    class="btn-register !tw-font-normal !tw-capitalize !tw-text-[#64748b] tw-rounded-md mx-auto sm-mx-0 tw-flex tw-mx-auto"
                    size="md"
                    color="#64748b"
                    flat
                >
                    {{ Helper.tLang('auth.login.forgotPassword') }}
                  </q-btn>
                </NuxtLink>
              </div>
              <div class="tw-flex tw-justify-center tw-mb-1">
                <SocialAuthGoogle/>
                <SocialAuthFacebook/>
              </div>
              <transition name="hero">
                <q-btn
                    :disabled="loading"
                    class="glossy tw-tracking-widest"
                    type="submit"
                    color="primary"
                    unelevated
                    no-caps
                >
                <span class="tw-ml-3">
                  {{ Helper.tLang('auth.login.submitBtn') }}
                </span>
                </q-btn>
              </transition>
            </q-form>
            <div class="max-[400px]:tw-flex-col tw-flex tw-items-center justify-center tw-mt-8 tw-gap-4">
              <p class="tw-text-slate-700 tw-text-sm tw-font-light tw-text-center">
                {{ Helper.tLang('auth.login.withoutAccount.content') }}
              </p>
              <NuxtLink :to="getPath('iauth.register')">
                <q-btn
                    class="btn-register !tw-font-normal !tw-capitalize !tw-text-[#64748b] tw-rounded-md"
                    size="md"
                    color="#64748b"
                    flat
                >
                   {{ Helper.tLang('auth.login.withoutAccount.link') }}
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
</style>
