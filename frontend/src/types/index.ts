export interface Sector {
  id: string
  name: string
  slug: string
  createdAt: string
}

export interface Emission {
  id: string
  label: string
  value: number
  unit: string
  source: string | null
  sectorId: string
  sector: Sector
}
