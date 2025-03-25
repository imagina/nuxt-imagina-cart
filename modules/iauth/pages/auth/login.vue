<script setup lang="ts">
import { reactive, ref } from 'vue'
import PasswordValidator from '@/utils/validators/passwordValidator'

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
            <q-form @submit.prevent.stop="login" ref="refLogin">
              <q-input
                  dense
                  rounded
                  outlined
                  class="tw-mb-0 lg:tw-mb-2"
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
                  rounded
                  outlined
                  class="tw-mb-5 lg:tw-mb-10"
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
              <div class="tw-flex tw-justify-between tw-flex-col sm:tw-flex-row tw-mb-6">
                <label class="tw-flex tw-items-center tw-mb-5 tw-mb-sm-0">
                  <q-checkbox
                      class="tw-bg-input !tw-border-input"
                      v-model="auth.remember_me"
                  ></q-checkbox>
                  <span class="tw-ml-2 tw-text-md lg:tw-text-base">
                  {{ Helper.tLang('auth.login.inputs.rememberMe') }}
                </span>
                </label>
                <NuxtLink :to="getPath('iauth.resetPassword')"
                          class="tw-text-primary tw-pt-3 tw-text-md lg:tw-text-base tw-text-center sm:tw-text-left tw-duration-300 hover:tw-underline hover:tw-text-secondary">
                  {{ Helper.tLang('auth.login.forgotPassword') }}
                </NuxtLink>
              </div>
              <div class="tw-flex tw-justify-center tw-mb-6">
                <SocialAuthGoogle/>
                <SocialAuthFacebook/>
              </div>
              <transition name="hero">
                <q-btn
                    :disabled="loading"
                    class="glossy tw-py-1.5 tw-px-3 md:tw-py-2.5 sm:tw-px-5 tw-text-sm sm:tw-text-base tw-tracking-wider"
                    type="submit"
                    color="primary"
                    rounded
                    push
                >
                <span class="tw-ml-3">
                  {{ Helper.tLang('auth.login.submitBtn') }}
                </span>
                </q-btn>
              </transition>
            </q-form>
            <p
                class="tw-mt-8 tw-text-sm tw-font-light tw-text-center"
            >
              {{ Helper.tLang('auth.login.withoutAccount.content') }}
              <NuxtLink :to="getPath('iauth.register')"
                        class="tw-text-primary tw-ml-1 tw-font-bold tw-duration-150 hover:tw-text-secondary ">
                {{ Helper.tLang('auth.login.withoutAccount.link') }}
              </NuxtLink>
            </p>
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
