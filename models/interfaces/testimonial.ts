import type { MediaFiles, MediasMulti } from './user'

export interface Testimonial {
  category: {
    createdAt: string
    createdBy: number
    deletedAt: null
    deletedBy: null
    depth: null
    description: string
    es: {
      userId?: any
      layoutId: any
      titleOffline: any
      offlineId: any
    }
    externalId: null
    featured: number
    fields: {
      createdAt: Date
      createdBy: number
      deletedAt: null
      deletedBy: null
      entityId: number
      entityType: string
      id: number
      name: string
      organizationId: null
      type: null
      updatedAt: Date
      updatedBy: number
      value: number | null | string
    }[]
    id: number
    internal: number
    layoutId: null
    lft: number
    mainImage: MainImage
    metaDescription: string
    metaKeywords: null
    metaTitle: string
    offlineId: null
    options: {
      masterRecord: number
    }
    organizationId: null
    parentId: null
    rgt: number
    showMenu: number
    slug: string
    sortOrder: number
    status: number
    title: string
    titleOffline: string
    translatableOptions: null
    updatedAt: string
    updatedBy: number
    url: string
    userId: number
  }
  categoryId: number
  createdAt: string
  createdBy: number
  dateAvailable: null
  deletedAt: null
  deletedBy: null
  description: string
  es: {
    userId?: any
    layoutId: any
    titleOffline: any
    offlineId: any
  }
  externalId: null
  featured: number
  fields: {
    createdAt: Date
    createdBy: number
    deletedAt: null
    deletedBy: null
    entityId: number
    entityType: string
    id: number
    name: string
    organizationId: null
    type: null
    updatedAt: Date
    updatedBy: number
    value: number | null | string
  }[]
  files: any[]
  gallery: null
  id: number
  layoutId: null
  mainImage: MainImage
  mediaFiles: MediaFiles
  mediasMulti: MediasMulti
  mediasSingle: any[]
  metaDescription: null
  metaKeywords: null
  metaTitle: null
  offlineId: null
  options: {
    masterRecord: string
    urlCoder: string
    profession?: string
  }
  organizationId: null
  slug: string
  sortOrder: number
  status: number
  statusName: string
  summary: string
  tags: any[]
  title: string
  titleOffline: string
  translatableOptions: null
  updatedAt: string
  updatedBy: number
  url: string
  userId: number
}

export interface MainImage {
  mimeType: string
  path: string
}
