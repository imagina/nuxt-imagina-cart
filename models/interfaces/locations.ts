export interface Province {
  countryId: number
  createdAt: Date
  createdBy: null
  deletedAt: null
  deletedBy: null
  id: number
  iso2: string
  name: string
  organizationId: null
  updatedAt: Date
  updatedBy: null
}
export interface City {
  code: string
  countryId: number
  createdAt: Date
  createdBy: null
  deletedAt: null
  deletedBy: null
  id: number
  name: string
  organizationId: null
  provinceId: number
  updatedAt: Date
  updatedBy: null
}

export interface Country {
  callingCode: number
  countryCode: number
  createdAt: Date
  createdBy: null
  currency: string
  currencyCode: string
  currencySubUnit: string
  currencySymbol: string
  deletedAt: null
  deletedBy: null
  flagUrl: string
  fullName: string
  icoUrl: string
  id: number
  iso2: string
  iso3: string
  name: string
  organizationId: null
  regionCode: string
  status: number
  subRegionCode: string
  updatedAt: Date
  updatedBy: null
}
