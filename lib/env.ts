export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'o1s2ofhu'

export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'o1s2ofhu') &&
  (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'o1s2ofhu') !== 'project-id-placeholder'


export const useCdn = false

