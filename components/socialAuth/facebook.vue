<script setup lang="ts">
import FacebookSVG from '@/assets/svg/brand/facebook.svg'

const proxy = getCurrentInstance()!.appContext.config.globalProperties

const store = useAuthStore()

const emit = defineEmits(['logged'])
const state = reactive({
  success: true,
  loading: false,
})

onMounted(() => {
  store.getFacebookSettings().then(() => addCDN())
})

const appIdFacebook = computed(() => store.getFacebookClientId)

////add CDN  to head
async function addCDN() {
  let appId = appIdFacebook.value
  window.fbAsyncInit = function () {
    FB.init({
      appId: appId,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v4.0',
    })
  }
  ;(function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    fjs?.parentNode?.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}

//SignIn method
async function signIn() {
  //let app = this //assigned this to another variable
  state.loading = true
  //Request login to facebook
  FB.getLoginStatus(function (response) {
    if (response.status == 'connected') return login(response)
    FB.login(
      (response) => {
        login(response)
      },
      { auth_type: 'reauthorize', scope: 'public_profile,email' },
    ) //Open window to login with facebook
  })
}
//Request Login
async function login(response) {
  //Validate response
  if (response.status != 'connected') return (state.loading = false)
  //Get access Token
  let token = response?.authResponse?.accessToken || false
  if (token) {
    store
      .authSocialNetwork({
        token,
        type: 'facebook',
      })
      .then((response) => {
        state.loading = false
        emit('logged')
      })
  }
}
</script>

<template>
  <Button
    v-if="appIdFacebook"
    @click="signIn()"
    type="button"
    class="!tw-rounded-[100%] tw-w-14 tw-h-14 tw-mr-5"
    :loading="state.loading"
  >
    <FacebookSVG
      style="color: #232323"
      filled
      class="tw-text-2xl !tw-h-auto !tw-m-0"
    />
  </Button>
</template>
