<template>
  <!--pagination-->
  <div :class="`full-width flex items-center ${isMobile ? 'justify-center' : 'justify-between'}`">         
    <div class="sm:tw-text-sm":class="`text-blue-grey ${isMobile ? 'q-mb-sm' : ''} `">
      {{ $t('isite.cms.label.showing') }} <b>{{ countPage() }}</b> {{ $t('isite.cms.label.entry') }}
    </div>
    <div class="col-12 q-ml-sm q-mr-lg flex flex-center tw-h-10">
      <q-pagination
        id="crudPaginationComponent"
        v-if="showPagination()"
        v-model="paginationModel.page"              
        @update:model-value="emit()"
        round
        input-class="no-shadow"
        color="while"
        text-color="primary"
        active-color="primary"
        active-text-color="white"
        :max="pagesNumber"
        :max-pages="paginationModel.maxPages"
        :ellipses="false"
        :boundary-numbers="false"
        unelevated
      />      
    </div>
    <div class="flex items-center">
      <div class="flex items-center tw-mr-4 text-blue-grey">
        <span class="sm:tw-text-sm">{{ $t('isite.cms.label.show') }}</span>
        <q-select
          v-model="paginationModel.rowsPerPage"
          :options="rowsPerPageOption"
          @update:modelValue="resetPage()"
          options-cover
          dense
          class="q-mx-sm text-caption"
          outlined
        />
        <span class="sm:tw-text-sm">{{ $t('isite.cms.label.entry') }}</span>
      </div>
      <div class="actionsBtnPag">
        <q-btn
          color="primary"
          class="tw-mr-2"
          dense
          size="14px"
          round
          flat
          :disable="isFirstPage"
          @click="prevPage()"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </q-btn>
        <q-btn
          color="primary"
          dense
          size="14px"
          round
          flat
          :disable="isLastPage"
          @click="nextPage()"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import controller from './controller'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        page: 1, 
        rowsNumber: 0, 
        rowsPerPage: 10, 
        descending: true, 
        maxPages: 6
      })
    },    
    pagesNumber: {default: 1}, 
    isFirstPage: {default: true}, 
    isLastPage: {default: false}    
  },
  components: {},
  setup(props, {emit}) {
    return controller(props, emit)
  },
  computed: {
    windowSize() {
      return window?.innerWidth >= 500 ? 'desktop' : 'mobile'
    },
    isMobile(){
      return this.windowSize == 'mobile'
    }
  }, 
  methods: {
    showPagination() {
      return this.windowSize == 'desktop' && this.pagesNumber > 1
    }
  },
})
</script>
<style lang="scss">
</style>
