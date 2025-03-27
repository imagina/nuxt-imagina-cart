<script setup lang="ts">
import {reactive, ref} from 'vue'
import PasswordValidator from '@/utils/validators/passwordValidator'
import captchaComponent from '../../components/captcha'
import logo from 'assets/red-logo-imagina.png'

const authStore = useAuthStore()

definePageMeta({
  //layout: '-bg',
})


const refRegister: any = ref(null)
const isPwd = ref(true)
const store = useAuthStore()

const auth = reactive<{
  firstName: string
  lastName: string
  email: string
  password: string
  passwordAgain: string
  agreement: boolean,
  captcha: any

}>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordAgain: '',
  agreement: false,
  captcha: null

})
const loading = false
const captchaRef = ref('captchaRef')

async function register() {
  try {
    const validateRegister = await refRegister.value.validate()
    if (!validateRegister) return
    await getCaptcha()
    await store.register(auth)
  } catch (error) {
    console.log(error)
  }
}

async function getCaptcha() {
  try {
    await captchaRef.value.getToken().then((response) => {
      auth.captcha = response
    })
  } catch (error) {
    console.error(error)
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
            class="tw-text-[18px] tw-leading-none tw-font-medium tw-text-slate-500 tw-mb-5"
        >
          {{ Helper.tLang('auth.register.title') }}
        </h1>
        <div class="tw-w-full tw-flex-1 tw-p2 tw-animate-fade-in">
          <div class="">
            <q-form @submit.prevent.stop="register" ref="refRegister">
              <div class="md:tw-flex tw-gap-4">
                <div class="md:tw-basis-1/2">
                  <q-input
                      dense
                      outlined
                      class="tw-mb-0 lg:tw-mb-2"
                      v-model="auth.firstName"
                      :label="Helper.tLang('auth.register.inputs.firstName')"

                      :rules="[
                      (val) => !!val || 'Nombre es requerido.',
                      (val) =>
                        val.length >= 3 ||
                        'El nombre debe de tener 3 o más caracteres',
                    ]"
                  />
                </div>
                <div class="md:tw-basis-1/2">
                  <q-input
                      dense
                      outlined
                      class="tw-mb-0 lg:tw-mb-2"
                      v-model="auth.lastName"
                      :label="Helper.tLang('auth.register.inputs.lastName')"

                      :rules="[
                      (val) => !!val || 'Apellido es requerido.',
                      (val) =>
                        val.length >= 3 ||
                        'El apellido debe de tener 3 o más caracteres.',
                    ]"
                  />
                </div>
              </div>
              <q-input
                  dense
                  outlined
                  class="tw-mb-0 lg:tw-mb-2"
                  v-model="auth.email"
                  :label="Helper.tLang('auth.register.inputs.email')"

                  :rules="[
                  (val) => !!val || 'Correo es requerido.',
                  (val) =>
                    /.+@.+\..+/.test(val) ||
                    'Por favor introduzca un correo valido',
                ]"
              >
              </q-input>
              <q-input
                  dense
                  outlined
                  class="tw-mb-6"
                  v-model="auth.password"
                  :label="Helper.tLang('auth.register.inputs.password')"

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
              <q-input
                  dense
                  outlined
                  class="tw-mb-4"
                  v-model="auth.passwordAgain"
                  :label="Helper.tLang('auth.register.inputs.passwordAgain')"

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
              <div class="tw-mb-6">
                <label class="tw-flex tw-items-center">
                  <q-checkbox
                      v-model="auth.agreement"
                  />
                  <span class="tw-ml-2 tw-text-sm md:tw-text-md tw-text-slate-500">
                    <!-- <i18n-t keypath="auth.register.inputs.termsAndCond.content">
                      <template #highlight1>
                        <NuxtLink
                          to="/termsAndConditions"
                          class="tw-text-primary tw-font-bold"
                        >
                          {{ $t('auth.register.inputs.termsAndCond.highlight1') }}
                        </NuxtLink>
                      </template>
                      <template #highlight2>
                        <NuxtLink
                          to="/privacyPolicy"
                          class="tw-text-primary tw-font-bold"
                        >
                          {{ $t('auth.register.inputs.termsAndCond.highlight2') }}
                        </NuxtLink>
                      </template>
                    </i18n-t> -->
                    Acepto el
                    <a
                        href="/termsAndConditions"
                        target="_blank"
                        class="tw-px-1 tw-font-[500] tw-duration-150 hover:tw-text-secondary"
                    >
                      Acuerdo de usuario
                    </a>
                    y la
                    <a
                        href="/dataProcessingPolicy"
                        target="_blank"
                        class="tw-pl-1 tw-font-[500] tw-duration-150 hover:tw-text-secondary"
                    >
                      Política de privacidad
                    </a>
                    .
                  </span>
                </label>
              </div>
              <transition name="hero">
                <q-btn
                    :disabled="
                    loading ||
                    !auth.agreement ||
                    auth.password !== auth.passwordAgain
                  "
                    type="submit"
                    class="glossy tw-tracking-widest"
                    color="primary"
                    unelevated
                    no-caps
                >
                  <span class="tw-ml-3">
                    {{ Helper.tLang('auth.register.submitBtn') }}
                  </span>
                </q-btn>
              </transition>
            </q-form>
            <ClientOnly>
              <captchaComponent
                  ref="captchaRef"
              />
            </ClientOnly>
            <div class="max-[400px]:tw-flex-col tw-flex tw-items-center justify-center tw-mt-8 tw-gap-4">
              <p class="tw-text-slate-700 tw-text-sm tw-font-light tw-text-center">
                {{ Helper.tLang('auth.register.existAccount.content') }}
              </p>
              <NuxtLink :to="getPath('iauth.login')">
                <q-btn
                    class="btn-register !tw-font-normal !tw-capitalize !tw-text-[#64748b] tw-rounded-md"
                    size="md"
                    color="#64748b"
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
</style>
