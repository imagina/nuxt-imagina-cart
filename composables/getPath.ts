
export default function (pageName) {
    const router = useRouter()
    const page =  router.getRoutes().find(page => page.name == pageName) || { path: ''}
    return page.path
} 
  
