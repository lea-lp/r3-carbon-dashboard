import { useQuery } from '@tanstack/react-query'
import client from '../api/client'
import type { Emission } from '../types'

const fetchEmissions = async (sectorId?: string): Promise<Emission[]> => {
  const { data } = await client.get<Emission[]>('/emissions', {
    params: sectorId ? { sectorId } : undefined,
  })
  return data
}

export const useEmissions = (sectorId?: string) =>
  useQuery({
    queryKey: ['emissions', sectorId],
    queryFn: () => fetchEmissions(sectorId),
  })
