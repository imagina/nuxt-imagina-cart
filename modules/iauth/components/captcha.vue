<template>
    <ClientOnly>
        <div id="masterCaptchaComponent" v-if="captcha.key">
          <!--Widget V2-->
          <div v-if="captcha.version == '2'" id="g-recaptcha"></div>
          <!--Text V3-->
          <div v-if="captcha.version == '3'" class="text-info-v3" v-html="'isite.cms.message.captcha'"></div>
        </div>
    </ClientOnly>
  </template>
  <script>
  export default {
    name: 'captchaComponent',
    props: {},
    emits: ['update:modelValue'],
    setup(){

    },
    mounted() {
        this.init()
    },
    data() {
      return {
        widget: null
      }
    },
    computed: {
      //Return settings data
      settings() {
        return {
          captchV2: getSetting('isite::reCaptchaV2Site'),
          captchV3: getSetting('isite::reCaptchaV3Site'),
          activeCaptcha: getSetting('isite::activateCaptcha')
        }
      },
      //Return config captcha
      captcha() {
        //Define what version use (v3 has priority)
        let version = !this.settings.activeCaptcha ? null : (this.settings.captchV3 ? '3' : (this.settings.captchV2 ? '2' : null))
        //Response
        return {version: version, key: version ? this.settings[`captchV${version}`] : null}
      },
    },
    methods: {
      //Init
      init() {
        //if (process.env.CLIENT) {
          this.loadCaptcha()
        //}
      },
      //add CDN captcha
      loadCaptcha() {
        if (this.captcha.key) {
          try {
            //Instance attributes by version
            let cdnAttributes = (this.captcha.version == '2') ? '' : '?render=' + this.captcha.key
            let recaptcha = document.createElement('script')//create CDN google recaptcha
            recaptcha.setAttribute('src', 'https://www.google.com/recaptcha/api.js' + cdnAttributes)
            recaptcha.onload = this.initCaptcha()//callback when loaded cdn
            document.head.appendChild(recaptcha)//add to head
            console.log('loadCaptcha')
          } catch (e) {
            console.error(e)
          }
        } else this.$emit('update:modelValue', {token: true})
      },
      //Listen token catpcha and emit token
      initCaptcha() {
        try {
          //Set time out to permit success loaded of cdn
          setTimeout(() => {
            if (this.captcha.version == '2') {//(V2)
              this.widget = grecaptcha.render('g-recaptcha', {
                sitekey: this.captcha.key,
                callback: (token) => {
                  this.$emit('update:modelValue', {version: 2, token: token})
                },
                'expired-callback': () => {
                  this.$emit('update:modelValue', null)
                  grecaptcha.reset(this.widget)
                }
              })
            } else {//(V3)
              grecaptcha.ready(() => {
                this.$emit('update:modelValue', {version: 3, token: null})
              })
            }
          }, 500)
        } catch (error) {
          console.error(error)
        }
      },
      
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
  
  <style lang="scss">
  #masterCaptchaComponent {
    #g-recaptcha {
      width: max-content;
      margin: auto;
    }
  
    .text-info-v3 {
      color: $grey-5;
      font-size: 14px;
      text-align: justify;
  
      a {
        color: $light-blue-13;
      }
    }
  }
  
  //Hidden badage
  .grecaptcha-badge {
    visibility: hidden;
  }
  </style>
  