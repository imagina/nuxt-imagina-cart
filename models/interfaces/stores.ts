import type { Project, ProjectTag } from './projects'
import type { UserData } from './user'
import type { PaginationInfo } from './utils'

export interface AuthState {
  username: string
  password: string
  user: UserData | null
  token: string
  expiresIn: Date | null
  loading: boolean
  facebookClientId: any
  googleClientId: any
}
export interface ProjectsState {
  projects: Project[]
  pagination: PaginationInfo
  selected: Project | null | undefined
  filters: any
  loading: boolean
}
export interface CategoriesState {
  categories: ProjectTag[]
  selected?: ProjectTag
  pagination: PaginationInfo
  filters: any
  loading: boolean
  parentCategories: ProjectTag[]
}

export interface NewProjectFormValue {
  es: {
    title: string
    slug: string
    description: string
  }
  min_price: number
  max_price: number
  status?: 0 | 1 | 2
  categories: number[]
  options?: {
    currency: string
  }

  medias_single?: {
    mainimage: number
  }
  medias_multi?: {
    gallery?: {
      files: number[]
    }
    documents?: {
      files: number[]
    }
  }
  user_id?: any
  country_id?: any
  province_id?: any
  city_id?: any
  files?: FileList
}
export interface NewProposalFormValue {
  ad_id: number
  description: string
  amount: number
  delivery_days: number
  currency: 'USD' | 'COP'

  medias_multi?: {
    documents?: {
      files: number[]
    }
  }

  files?: FileList
}
