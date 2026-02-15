'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadFile } from '../api'

export function useUpload() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadFile,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
}
