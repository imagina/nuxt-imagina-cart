
import { useAuthStore  } from '../modules/iauth/stores/useAuth'

export default function (name) {
    const authStore = useAuthStore()

    const settings = authStore.settings?.siteSettings || null
    if(!settings) return null
    const setting = settings.find((item) => item.name == name)      
    return setting && setting?.value ? setting.value : null    
} 
  
