<template>
    <ClientOnly>
        <div id="masterCaptchaComponent" v-if="captchaKey">
          <div class="text-info-v3" v-html="$t('iauth.captcha')"></div>
        </div>
    </ClientOnly>
</template>
<script>
  export default {
    name: 'captchaComponent',
    props: {},
    emits: ['update:modelValue'],
    setup(){
      const store = useAuthStore();
      return {
        store
      }
    },
    data(){
      return {
        captchaKey: null,
        activeCaptcha: null
      }
    },
    mounted() {
        this.init()
    },
    methods: {
      //Init
      async init() {
        this.captchaKey = getSetting('isite::reCaptchaV3Site') || null
        this.activeCaptcha = getSetting('isite::activateCaptcha') || null
        if(this.activeCaptcha){
          this.loadCaptcha()
        }
        
      },
      //add CDN captcha
      loadCaptcha() {
        if (this.captchaKey) {
          try {
            //Instance attributes by version
            let cdnAttributes = '?render=' + this.captchaKey
            let recaptcha = document.createElement('script')//create CDN google recaptcha
            recaptcha.setAttribute('src', 'https://www.google.com/recaptcha/api.js' + cdnAttributes)
            document.head.appendChild(recaptcha)//add to head
          } catch (e) {
            console.error(e)
          }
        }
      },
      //Listen token catpcha and emit token
      async getToken(){
        return new Promise((resolve, reject) => {
          if(this.captchaKey){
            grecaptcha.execute(this.captchaKey, {action: 'submit'}).then(token => {
              const response = {version: 3, token}
              resolve(response)
            })
          } else {
            reject(null)
          }
        })
      },
    }
  }
  </script>

  <style >

    #g-recaptcha {
      width: max-content;
      margin: auto;
    }

    .text-info-v3 {
      color: #bdbdbd;
      font-size: 14px;
      text-align: justify;
    }

    .text-info-v3 > a {
      color: #00b0ff !important;
    }

    .grecaptcha-badge {
      visibility: hidden;
    }
  </style>
