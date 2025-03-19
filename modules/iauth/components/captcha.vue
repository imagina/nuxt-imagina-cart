<template>      
    <div id="masterCaptchaComponent" v-if="captcha.key">
        {{ settings}}
      <!--Widget V2-->
      <div v-if="captcha.version == '2'" id="g-recaptcha"></div>
      <!--Text V3-->
      <div v-if="captcha.version == '3'" class="text-info-v3" v-html="'isite.cms.message.captcha'"></div>
    </div>
</template>


<script setup lang="ts">


const emits = defineEmits(['update:modelValue'])

onMounted(() => {
  if (process.env.CLIENT) {
    init()
  }
})

const widget = ref(null)
const responseValue = ref()

//Return settings data
const settings = computed(() => {
        return {
          captchV2: getSetting('isite::reCaptchaV2Site'),
          captchV3: getSetting('isite::reCaptchaV3Site'),
          activeCaptcha: getSetting('isite::activateCaptcha')
        }
});

//Return config captcha
const captcha = computed(() => {
        //Define what version use (v3 has priority)
        let version = !settings.value.activeCaptcha ? null : (settings.value.captchV3 ? '3' : (settings.value.captchV2 ? '2' : null))
        //Response
        return {version: version, key: version ? settings.value[`captchV${version}`] : null}
      });
    
function init(){
  
    loadCaptcha()
  
}      

function loadCaptcha(){
  if (captcha.value.key) {
    try {
      //Instance attributes by version
      let cdnAttributes = (captcha.value.version == '2') ? '' : '?render=' + captcha.value.key
      let recaptcha = document.createElement('script')//create CDN google recaptcha
      recaptcha.setAttribute('src', 'https://www.google.com/recaptcha/api.js' + cdnAttributes)
      recaptcha.onload = initCaptcha()//callback when loaded cdn
      document.head.appendChild(recaptcha)//add to head
    } catch (e) {
      console.error(e)
    }
  } else responseValue.value =  {token: true}
}

//Listen token catpcha and emit token
function initCaptcha() {
  try {
    //Set time out to permit success loaded of cdn
    setTimeout(() => {
      if (captcha.value.version == '2') {//(V2)
        widget.value = grecaptcha.render('g-recaptcha', {
          sitekey: captcha.value.key,
          callback: (token) => {
            responseValue.value = {version: 2, token: token}
          },
          'expired-callback': () => {
            responseValue.value = null
            grecaptcha.reset(widget.value)
          }
        })
      } else {//(V3)
        grecaptcha.ready(() => {
          responseValue.value = {version: 3, token: null}
        })
      }
    }, 500)
  } catch (error) {
    console.error(error)
  }
}
  

function getToken(){
  return new Promise((resolve, reject) => {
    grecaptcha.execute(captcha.value.key, {action: 'submit'}).then(token => {
      const response = {version: 3, token}
      responseValue.value = response
      resolve(response)
    })
  })
}

function getResponseValue(){
  return responseValue.value
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