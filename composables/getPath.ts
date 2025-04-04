
export default function (pageName) {
    const router = useRouter()
    const { locale, locales } = useI18n()
    
    const page = router.getRoutes().find(page => page.name == pageName) || { path: ''}
    if(page?.meta?.paths) {
        return page.meta.paths[locale.value]
    }
    return page.path
    



    
} 
  
