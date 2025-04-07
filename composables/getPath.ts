
export default function (pageName) {
    const router = useRouter()
    /* multi lang paths */
    //const { locale, locales } = useI18n()
    
    const page = router.getRoutes().find(page => page.name == pageName) || { path: ''}

    /* multi lang paths */
    /*
    if(page?.meta?.paths) {
        return page.meta.paths[locale.value]
    }
    */
    return page.path
} 
  
