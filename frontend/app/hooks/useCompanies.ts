'use client'

import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '../api'

export type Company = {
  id: string
  domain: string
  industry: string | null
  company_size: string | null
  revenue_range: string | null
  status: string
}

export function useCompanies() {
  return useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: getCompanies,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 30,
  })
}
