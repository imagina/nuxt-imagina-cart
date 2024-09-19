<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
const refLogin: any = ref(null);
const isPwd = ref(true);
const store = useAuthStore();
definePageMeta({
  middleware: 'auth'
})
const auth = reactive<{username: string; password: string }>({
  username: '',
  password: '',
})
const loading = computed(() => store.loading)
async function login() {
  try {
    const validateLogin = await refLogin.value.validate()
    if(!validateLogin) return;
    await store.login(auth);
  } catch (erro) {
    console.log(erro)
  }
}

</script>

<template>
  <div class="tw-min-h-screen tw-bg-gray-100 tw-text-gray-900 tw-flex tw-justify-center">
    <div class="tw-max-w-screen-xl tw-m-0 sm:tw-m-10 tw-bg-white tw-shadow sm:tw-rounded-lg tw-flex tw-justify-center tw-flex-1">
      <div class="lg:tw-w-1/2 xl:tw-w-5/12 tw-p-6 sm:tw-p-12">
        <div class="tw-mt-12 tw-flex tw-flex-col tw-items-center">
          <h1 class="tw-text-2xl xl:tw-text-3xl tw-font-extrabold">
            Login
          </h1>
          <div class="tw-w-full tw-flex-1 tw-mt-8">
            <div class="tw-flex tw-flex-col tw-items-center">
              <Button
                  class="tw-w-full tw-max-w-xs tw-font-bold tw-shadow-sm tw-rounded-lg tw-py-3 tw-bg-indigo-100 tw-text-gray-800 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 tw-ease-in-out tw-focus:outline-none tw-hover:tw-shadow tw-focus:tw-shadow-sm tw-focus:tw-shadow-outline">
                <div class="tw-bg-white tw-p-2 tw-rounded-full">
                  <svg class="tw-w-4" viewBox="0 0 533.5 544.3">
                    <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4" />
                    <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853" />
                    <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04" />
                    <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335" />
                  </svg>
                </div>
                <span class="tw-ml-4 tw-text-white">
                                Login with Google
                            </span>
              </Button>
            </div>

            <div class="tw-my-12 tw-border-b tw-text-center">
              <div
                  class="tw-leading-none tw-px-2 tw-inline-block tw-text-sm tw-text-gray-600 tw-tracking-wide tw-font-medium tw-bg-white tw-transform tw-translate-y-1/2">
                Or login with e-mail
              </div>
            </div>

            <div class="tw-mx-auto tw-max-w-xs">
              <q-form @submit.prevent.stop="login" ref="refLogin">
                <q-input
                    filled
                    v-model="auth.username"
                    label="* Email"
                    lazy-rules
                    :rules="[
                      val => !!val || 'Email is required.',
                      val => /.+@.+\..+/.test(val) || 'Please enter a valid email'
                    ]"
                />
                <q-input
                    filled
                    v-model="auth.password"
                    label="* Password"
                    lazy-rules
                    :rules="[
                      val => !!val || 'Password is required',
                      val => val.length >= 8 || 'Password must be at least 8 characters long',
                      val => /[A-Z]/.test(val) || 'Must contain at least one uppercase letter',
                      val => /[a-z]/.test(val) || 'Must contain at least one lowercase letter',
                      val => /\d/.test(val) || 'Must contain at least one number',
                      val => /[\W_]/.test(val) || 'Must contain at least one special character'
                    ]"
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
                <Button
                    :disabled="loading"
                    type="submit"
                    class="tw-mt-5 tw-tracking-wide tw-font-semibold tw-bg-indigo-500 tw-text-gray-100 tw-w-full tw-py-4 tw-rounded-lg tw-hover:bg-indigo-700 tw-transition-all tw-duration-300 tw-ease-in-out tw-flex tw-items-center tw-justify-center">
                  <svg v-if="!loading" class="tw-w-6 tw-h-6 -tw-ml-2" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <svg v-if="loading" class="tw-animate-spin -tw-ml-1 tw-mr-3 tw-h-5 tw-w-5 tw-text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="tw-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="tw-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="tw-ml-3">
                    Login
                  </span>
                </Button>
              </q-form>
              <p class="tw-mt-6 tw-text-xs tw-text-gray-600 tw-text-center">
                I agree to abide by templatana's
                <a href="#" class="tw-border-b tw-border-gray-500 tw-border-dotted">
                  Terms of Service
                </a>
                and its
                <a href="#" class="tw-border-b tw-border-gray-500 tw-border-dotted">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="tw-flex-1 tw-bg-indigo-100 tw-text-center tw-hidden lg:tw-flex">
        <div class="tw-m-12 xl:tw-m-16 tw-w-full tw-bg-contain tw-bg-center tw-bg-no-repeat"
             style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
        </div>
      </div>
    </div>
  </div>
</template>