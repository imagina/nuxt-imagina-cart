<template>
    <ClientOnly>
        <div id="masterCaptchaComponent" v-if="captcha.key">
          <!--Text V3-->
          <div v-if="captcha.version == '3'" class="text-info-v3" v-html="$t('iauth.captcha')"></div>
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
    mounted() {
        this.init()
    },
    computed: {
      //Return settings data
      settings() {
        return {
          captchV3: getSetting('isite::reCaptchaV3Site'),
          activeCaptcha: getSetting('isite::activateCaptcha')
        }
      },
      //Return config captcha
      captcha() {
          return {version: 3, key: this.settings.captchV3}
      },
    },
    methods: {
      //Init
      async init() {
        await this.store.getSettings().then(() => {
          if(this.settings.activeCaptcha){
            this.loadCaptcha()
          }
        })
      },
      //add CDN captcha
      loadCaptcha() {
        if (this.captcha.key) {
          try {
            //Instance attributes by version
            let cdnAttributes = '?render=' + this.captcha.key
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
          if(this.captcha.key){
            grecaptcha.execute(this.captcha.key, {action: 'submit'}).then(token => {
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
