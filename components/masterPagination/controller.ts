import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance, markRaw} from "vue";


export default function controller(props, emit) {
  
  const { t } = useI18n();
  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  }

  // States
  const state = reactive({
    // Key: Default Value    
    paginationModel: {
      page: 1,
      rowsNumber: null,
      rowsPerPage: 10,
      descending: true,
      maxPages: 6 
    }
  })

  // Computed
  const computeds = {
    // key: computed(() => {})
    rowsPerPageOption: computed(() => [5, 10, 20, 50, 100, 300, 500]),
    isFirstPage: computed(() => props.isFirstPage),
    isLastPage: computed(() => props?.isLastPage)
  }  

  // Methods
  const methods = {
    // methodKey: () => {}
    countPage(){
      const page = state.paginationModel.page
      const rowsPerPage = state.paginationModel.rowsPerPage
      const rowsNumber = state.paginationModel.rowsNumber
      const start = ((page * rowsPerPage) - rowsPerPage) + 1
      const ends = computeds.isLastPage.value ? rowsNumber : (page * rowsPerPage)
      return `${start} - ${ends} ${t('isite.cms.label.of')} ${rowsNumber}`
    },
    emit(){
      emit('update:modelValue', state.paginationModel)
    },
    init(){
      state.paginationModel = props.modelValue
    },     
    nextPage(){
      state.paginationModel.page += 1
      methods.emit()
    },
    prevPage(){
      state.paginationModel.page -= 1
      methods.emit()
    },        
    resetPage(){
      state.paginationModel.page = 1
      methods.emit()
    },    
  }

  // Mounted
  onMounted(() => {
    methods.init()
  })

  // Watch
   watch(props, (newField, oldField): void => {
    state.paginationModel = newField.modelValue  
   }, {deep: true})

  return {...refs, ...(toRefs(state)), ...computeds, ...methods}
}
