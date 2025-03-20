import type {
  AllSettings,
  BaseUserInformation,
  Contacts,
  Department,
  MediaFiles,
  Permissions,
  Role,
  UserData,
  UserFields,
  UserSkill,
} from './interfaces/user'

export class User implements UserData {
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

  constructor(data: UserData) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.fullName = data.fullName
    this.isActivated = data.isActivated
    this.email = data.email
    this.permissions = data.permissions
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.lastLoginstring = data.lastLoginstring
    this.smallImage = data.smallImage
    this.mediumImage = data.mediumImage
    this.mainImage = data.mainImage
    this.contacts = data.contacts
    this.socialNetworks = data.socialNetworks
    this.departments = data.departments
    this.organizations = data.organizations
    this.settings = data.settings
    this.fields = data.fields
    this.addresses = data.addresses
    this.roles = data.roles
    this.allPermissions = data.allPermissions
    this.allSettings = data.allSettings
    this.files = data.files
    this.mediaFiles = data.mediaFiles
    this.skills = data.skills
    this.information = data.information
    this.ratings = data.ratings
    this.averageRating = data.averageRating
  }

  get extraFields(): {
    description?: UserFields
    place?: UserFields
    phone?: UserFields
    companyName?: UserFields
    [key: string]: UserFields | undefined
  } {
    if (!this.fields) return {}
    return this.fields.reduce(
      (prev: { [key: string]: UserFields | undefined }, curr) => {
        prev[`${curr.name}`] = curr
        return prev
      },
      {},
    )
  }
  get socialMedia(): {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    tikTok?: string
    youTube?: string
    web?: string
    [key: string]: string | undefined
  } {
    if (!this.socialNetworks.id) return {}
    const socialMedia = JSON.parse(this.socialNetworks.value)
    return socialMedia
  }
}
