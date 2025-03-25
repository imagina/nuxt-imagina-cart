<script setup lang="ts">
import {reactive, ref} from 'vue'
import PasswordValidator from '@/utils/validators/passwordValidator'
import captchaComponent from '../../components/captcha'

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
  <div class="tw-max-w-[90vw] sm:tw-max-w-xl xl:tw-max-w-2xl tw-mx-auto tw-h-screen">
    <div class="tw-flex tw-items-center tw-justify-center tw-h-full">
      <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
        <h1
            class="tw-text-3xl md:tw-text-[35px] xl:tw-text-[50px] tw-leading-none tw-font-medium tw tw-text-primary tw-capitalize tw-mb-7 lg:tw-mb-14"
        >
          {{ Helper.tLang('auth.register.title') }}
        </h1>
        <div class="tw-w-full tw-flex-1 shadow-form 5 tw-p-6 sm:tw-p-14 tw-rounded-3xl tw-animate-fade-in">
          <div class="">
            <q-form @submit.prevent.stop="register" ref="refRegister">
              <div class="md:tw-flex tw-gap-4">
                <div class="md:tw-basis-1/2">
                  <q-input
                      dense
                      rounded
                      outlined
                      class="tw-mb-0 lg:tw-mb-4"
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
                      rounded
                      outlined
                      class="tw-mb-0 lg:tw-mb-4"
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
                  rounded
                  outlined
                  class="tw-mb-0 lg:tw-mb-4"
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
                  rounded
                  outlined
                  class="tw-mb-4"
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
                  rounded
                  outlined
                  class="tw-mb-6 lg:tw-mb-10"
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
                  <span class="tw-ml-2 tw-text-md">
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
                        class="tw-text-primary tw-font-bold tw-duration-150 hover:tw-text-secondary"
                    >
                      Acuerdo de usuario
                    </a>
                    y la
                    <a
                        href="/dataProcessingPolicy"
                        target="_blank"
                        class="tw-text-primary tw-font-bold tw-duration-150 hover:tw-text-secondary"
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
                    class="glossy tw-py-1.5 tw-px-3 md:tw-py-2.5 sm:tw-px-5 tw-text-sm sm:tw-text-base tw-tracking-wider"
                    color="primary"
                    rounded
                    push
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

            <p
                class="tw-mt-8 tw-text-sm tw-font-light tw-text-center"
            >
              {{ Helper.tLang('auth.register.existAccount.content') }}
              <NuxtLink to="/auth/login"
                        class="tw-text-primary tw-ml-1 tw-font-bold tw-duration-150 hover:tw-text-secondary">
                {{ Helper.tLang('auth.register.existAccount.link') }}
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-form{
  box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.08), 0px 3.8px 33px rgba(0, 0, 0, 0.04), 0px 0.8px 8.4px rgba(0, 0, 0, 0.02);
}
</style>
