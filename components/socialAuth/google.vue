<script setup lang="ts">
import GoogleSVG from '@/assets/svg/brand/google.svg'

const proxy = getCurrentInstance()!.appContext.config.globalProperties
const store = useAuthStore()
const emit = defineEmits(['logged'])

const state = reactive({
  success: true,
  loading: false,
})

onMounted(() => {
  store.getGoogleSettings().then(() => addCDN())
})

const clientIdGoogle = computed(() => store.getGoogleClientId)

async function addCDN() {
  let cdn = document.createElement('script') //create CDN google recaptcha
  cdn.setAttribute('src', 'https://accounts.google.com/gsi/client')
  cdn.onload = loadClientId() //callback when loaded cdn
  document.head.appendChild(cdn) //add to head
}

//Load Client ID
async function loadClientId() {
  setTimeout(() => {
    let clientId = clientIdGoogle.value || null
    if (!clientId) return

    // Initialize Google Identity Services
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        login(response)
      },
      scope: 'profile email openid',
      cancel_on_tap_outside: false,
      context: 'use',
    })

    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {theme: "outline", size: "large"}
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, 800)
}

//SignIn method
async function signIn(response) {
  google.accounts.id.prompt()
}
//Request Login
async function login(response) {
  if (response?.credential) {
    let token = response.credential
    store
      .authSocialNetwork({
        token,
        type: 'google',
      })
      .then((response) => {
        state.loading = false
        emit('logged')
      })
  }
}
</script>

<template>
  <div
    v-if="clientIdGoogle"
    id="googleButton"
  >
  </div>
</template>
