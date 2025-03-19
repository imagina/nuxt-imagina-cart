<script setup lang="ts">
import { reactive, ref } from 'vue'
import PasswordValidator from '@/utils/validators/passwordValidator'
import captchaComponent from '../../components/bcaptcha'

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

onMounted(() => {
  
})

async function register() {
  try {
    const validateRegister = await refRegister.value.validate()
    if (!validateRegister) return
    await getCaptcha()
    console.log(auth)
    await store.register(auth)
  } catch (error) {
    console.log(error)
  }
}

  async function getCaptcha(){
  
  try {
    await captchaRef.value.getToken().then((response) => {
      console.log(response)
      auth.captcha = response
    })
  } catch (error) {
    console.error(error)
  }
 
}


</script>

<template>
  <div class="lg:tw-w-1/2 xl:tw-w-5/12 tw-p-6 sm:tw-p-12">
    <div class="tw-mt-12 tw-flex tw-flex-col tw-items-center">      

       auth {{ auth}}
      <NuxtLink to="/">
        
      </NuxtLink>
      <h1
        class="tw-text-[35px] xl:tw-text-[50px] tw-font-extralight tw-text-white tw-mb-4"
      >
        {{ Helper.tLang('auth.register.title') }}
      </h1>
      <div class="tw-w-full tw-flex-1">
        <div class="">
          <q-form @submit.prevent.stop="register" ref="refRegister">
            <div class="tw-flex">
              <div class="tw-basis-1/2 tw-pr-2">
                <q-input                  
                  rounded
                  class="tw-mb-3"
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
              <div class="tw-basis-1/2 tw-pl-2">
                <q-input                  
                  rounded
                  class="tw-mb-3"
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
              rounded
              class="tw-mb-3"
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
              rounded
              class="tw-mb-2"
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
              filled
              
              rounded
              class="tw-mb-2"
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
                <span class="tw-ml-2">
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
                    class="tw-text-primary tw-font-bold"
                  >
                    Acuerdo de usuario
                  </a>
                  y la
                  <a
                    href="/dataProcessingPolicy"
                    target="_blank"
                    class="tw-text-primary tw-font-bold"
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
                class="tw-mt-5"
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
            class="tw-mt-8 tw-text-sm tw-font-extralight tw-text-center"
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
</template>

<style scoped>
</style>
