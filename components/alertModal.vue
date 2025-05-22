
<template>
  <q-dialog id="alertModalComponent" v-model="showModal" persistent
            transition-show="slide-up" transition-hide="slide-down" :style="modalWidth">
    <div class="tw-bg-white tw-w-full md:tw-w-1/2 tw-p-4">
      <!--Header-->
      <q-toolbar :class="`q-px-none`" style="min-height: auto">
        <q-toolbar-title v-if="paramsModal.title" class="box-title row items-center">
          <q-icon v-if="false" size="25px" :name="paramsModal.icon" :color="paramsModal.color"/>
          {{ paramsModal.title }}
        </q-toolbar-title>
        <q-btn size="sm" icon="fas fa-times" round color="blue-grey-5" text-color="white" v-close-popup unelevated
               v-if="!actionsModal || !actionsModal.length">
          <q-tooltip>{{ 'isite.cms.label.close' }}</q-tooltip>
        </q-btn>
      </q-toolbar>

      <!--Separator-->
      <q-separator v-if="paramsModal.title" class="q-mt-sm"/>

      <!--Content-->
      <q-card-section class="relative-position col-12 q-px-none q-pb-none">
        <!--Message-->
        <div v-html="paramsModal.message" class="q-mb-lg"></div>
        <!--button Actions-->
        <div
          id="actions"
          class="row justify-end q-gutter-sm">
          <q-btn v-for="(actionProps, keyAction) in actionsModal" :key="keyAction" v-bind="actionProps" v-close-popup
                 @click="callBack(actionProps)"/>
        </div>
      </q-card-section>
    </div>
  </q-dialog>
</template>
<script>
export default {
    name: 'alertModal',
  props: {
    params: {default: false}
  },
  components: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
        showModal: false,
      loading: false,
      data: []
    }
  },
  computed: {
    paramsModal() {
      return {
        icon: 'fas fa-bell',
        color: 'cyan',
        title: 'isite.cms.label.notification',
        message: 'Message...',
        actions: [{label: 'isite.cms.label.ok'}],
        ...this.params
      }
    },
    modalWidth() {
      return { '--modalWidth': this.params.modalWidth ? this.params.modalWidth : '400px' }
    },
    //Return Actions modal as props to q-btn
    actionsModal() {
      return this.paramsModal.actions.map(action => {
        let response = {
          unelevated: true,
          rounded: true,
          noCaps: true,          
          toUrl: action.toUrl || false,
          handler: action.handler || false
        }
        //Dynamics props
        if(action.color) response.color = action.color
        if(action.textColor) response.textColor = action.textColor
        
        if (action.label) response.label = action.label
        if (action.icon) response.icon = action.icon
        if (action.to) response.to = action.to

        
        
        
        //Repsonse
        return response
      })
    }
  },
  methods: {
    init() {
    },
    //show method
    show() {        
        this.showModal = true
      //this.$refs.alertModalComponent.show()
    },
    //Hide method
    hide() {
      this.showModal = false
      //this.$refs.alertModalComponent.hide()
    },
    //Callback
    
    callBack(action) {
      if (action.toUrl) this.$helper.openExternalURL(action.toUrl, false)
      else if (action.toVueRoute) this.$router.push(action.toVueRoute)
      else if (action.handler) action.handler()
    }
    
  }
}
</script>
<style>
#alertModalComponent {
  #cardContent {
    width: var(--modalWidth);
    max-width: 99%;
  }
}
</style>
