import type { City, Country, Province } from './locations'
import type { UserData } from './user'

export interface ProjectTag {
  createdAt: string | Date
  createdBy: number
  deletedAt: null
  deletedBy: null
  depth: null
  description: string
  id: number
  lft: number
  options: null
  organizationId: null
  parentId: number | null
  rgt: number
  slug: string
  sortOrder: number
  status: number
  title: string
  updatedAt: string | Date
  updatedBy: number
  url: string
  pivot?: {
    adId: number
    categoryId: number
  }
  children?: ProjectTag[]
}

export interface Project {
  bids?: Proposal[]
  categories?: ProjectTag[]
  checked: string
  cityId: number
  city?: City
  countryId: number
  country?: Country
  createdAt: string | Date
  createdBy: number
  defaultPrice: number
  deletedAt: null
  deletedBy: null
  description: string
  entityTitle: string
  featured: number
  fields: any[]
  files?: File[]
  id: number
  lat?: number
  lng?: number
  maxPrice: number
  mediaFiles: MediaFiles
  mediasMulti: MediasMulti
  mediasSingle: any[]
  minPrice: number
  neighborhoodId: null
  organizationId: null
  provinceId: number
  province?: Province
  slug: string
  sortOrder: number
  status: number
  statusName: string
  title: string
  updatedAt: string | Date
  updatedBy: number
  uploadedAt: string
  url: string
  userId: number
  options?: {
    currency: String
  }
  user?: UserInfo
}

export interface Proposal {
  adId: number //id del proyecto
  amount: number
  createdAt: string | Date
  createdBy: number
  currency: string
  deletedAt: null
  deletedBy: null
  deliveryDays: number
  description: string
  id: number
  options: null
  organizationId: null
  selected: number
  statusId: number
  statusLabel: StatusLabel
  updatedAt: string | Date
  updatedBy: number
  creator?: UserData
}

export interface StatusLabel {
  title: string
}

export interface File {
  id: number | null
  filename: null | string
  mimeType: null | string
  fileSize: null | string
  path: string
  relativePath: string
  isImage: boolean
  isVideo: boolean
  isFolder: boolean
  mediaType: string
  folderId: null | string
  description: null
  alt: null
  keywords: null
  createdBy: number | null
  createdAt: string | Date | null
  updatedAt: string | Date | null
  faIcon: string
  disk: null | string
  extension: null | string
  zone?: string
  url: string
  tags: any[]
  thumbnails: Thumbnail[]
  smallThumb: string
  relativeSmallThumb: string
  mediumThumb: string
  relativeMediumThumb: string
  largeThumb: string
  relativeLargeThumb: string
  extraLargeThumb: string
  relativeExtraLargeThumb: string
}

export interface Thumbnail {
  name: string
  path: string
  size: string
}

export interface MediaFiles {
  mainimage: File
  secondaryimage: File
  gallery: File[]
  videos: any[]
}

export interface MediasMulti {
  gallery?: Gallery
  videos?: Gallery
}

export interface Gallery {
  files: number[]
}

export interface UserInfo {
  createdAt: Date | string
  createdBy: number
  deletedAt: null
  deletedBy: null
  email: string
  firstName: string
  id: number
  isGuest: number
  language: null
  lastLogin: Date | string
  lastName: string
  organizationId: null
  permissions: any[] | null
  phone: null | string
  timezone: null
  updatedAt: Date | string
  updatedBy: number
  userName: null
}
export interface MediaData {
  id: number
  filename: string
  mimeType: string
  fileSize: number
  path: string
  relativePath: string
  isImage: boolean
  isVideo: boolean
  isFolder: boolean
  mediaType: string
  folderId: string
  description: null
  alt: null
  keywords: null
  createdBy: number
  createdAt: string | Date
  updatedAt: string | Date
  faIcon: string
  disk: string
  extension: string
  url: string
  tags: any[]
  thumbnails: Thumbnail[]
  smallThumb: string
  relativeSmallThumb: string
  mediumThumb: string
  relativeMediumThumb: string
  largeThumb: string
  relativeLargeThumb: string
  extraLargeThumb: string
  relativeExtraLargeThumb: string
}

export interface Thumbnail {
  name: string
  path: string
  size: string
}
