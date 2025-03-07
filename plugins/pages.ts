export default defineNuxtPlugin(() => {
    return {
      provide: {
        getPath: (pageName: string) => {
            const router = useRouter()
            return router.getRoutes().find(page => page.name == pageName)
        }
      }
    }
  })