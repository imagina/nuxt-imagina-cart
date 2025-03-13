export interface UserData {
  id: number
  firstName: string
  lastName: string
  fullName: string
  isActivated: string
  email: string
  permissions: any[]
  createdAt: string
  updatedAt: string
  lastLoginstring: string
  smallImage: string
  mediumImage: string
  mainImage: string
  contacts: Contacts
  socialNetworks: UserFields
  departments: Department[]
  organizations: any[]
  settings: any[]
  fields: UserFields[]
  addresses: any[]
  roles: Role[]
  allPermissions: Permissions
  allSettings: AllSettings
  files: any[]
  mediaFiles: MediaFiles
  skills?: UserSkill[]
  information?: BaseUserInformation[]
  ratings?: any[]
  averageRating?: number
}

export interface Permissions {
  [key: string]: boolean
}

export interface AllSettings {
  assignedSettings: string[]
}

export interface Contacts {
  name: string
  value: any[]
}

export interface Department {
  createdAt: string
  createdBy: null
  deletedAt?: null
  deletedBy?: null
  depth: null
  id: number
  isInternal: number
  lft: null
  options: null
  organizationId?: number
  parentId: number
  pivot: DepartmentPivot
  rgt: null
  title: string
  updatedAt: string
  updatedBy: null
}

export interface DepartmentPivot {
  departmentId: number
  userId: number
}

export interface MediaFiles {
  profile: MediaInfo
}

export interface MediaInfo {
  id: null
  filename: null
  mimeType: null
  fileSize: null
  path: string
  relativePath: string
  isImage: boolean
  isVideo: boolean
  isFolder: boolean
  mediaType: string
  folderId: null
  description: null
  alt: null
  keywords: null
  createdBy: null
  createdAt: null
  updatedAt: null
  faIcon: string
  disk: null
  extension: null
  url: string
  createdByUser: null
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

export interface Role {
  createdAt: string
  createdBy: null
  deletedAt?: null
  deletedBy?: null
  formId: null
  id: number
  name: string
  organizationId?: number
  permissions: Permissions
  pivot: RolePivot
  slug: string
  title: string
  updatedAt: string
  updatedBy: null
}

export interface RolePivot {
  createdAt: string
  roleId: number
  updatedAt: string
  userId: number
}
export interface UserSkill {
  createdAt: string
  createdBy: number
  deletedAt?: string
  deletedBy?: number
  entityId: string
  entityType: string
  id: number
  organizationId?: number
  title: string
  updatedAt: string
  updatedBy: number
  userId: number
}

export interface InformationMediaFiles {
  mainimage: MediaInfo
  gallery: any[]
  documents: any[]
}

export interface MediasMulti {
  gallery: Documents
  documents: Documents
}

export interface Documents {
  files: any[]
}

export interface MediasSingleClass {
  mainimage: number
}
export interface UserFields {
  createdAt: string
  createdBy: number
  deletedAt?: string
  deletedBy?: number
  id: number
  name: string
  organizationId?: number
  type: null
  updatedAt: string
  updatedBy: number
  userId: number
  value: string
}

export interface BaseUserInformation {
  createdAt: string
  createdBy: number
  deletedAt?: string
  deletedBy?: number
  description: string
  id: number
  options: {
    [key: string]: any
  }
  organizationId?: number
  title: string
  type: string
  updatedAt: string
  updatedBy: number
  userId: number
  mediaFiles?: InformationMediaFiles
  mediasMulti?: MediasMulti
  mediasSingle?: any[] | MediasSingleClass
}

export interface ExperienceUserInformation extends BaseUserInformation {
  type: 'experience'
  options: {
    dateInit: string
    dateEnd?: string
    skill?: string
    place: string
  }
}
