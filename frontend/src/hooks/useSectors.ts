import { useQuery } from '@tanstack/react-query'
import client from '../api/client'
import type { Sector } from '../types'

const fetchSectors = async (): Promise<Sector[]> => {
  const { data } = await client.get<Sector[]>('/sectors')
  return data
}

export const useSectors = () =>
  useQuery({
    queryKey: ['sectors'],
    queryFn: fetchSectors,
  })
