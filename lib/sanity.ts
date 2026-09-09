import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

import { apiVersion, dataset, projectId, useCdn } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source) {
    const fallback = {
      width: () => fallback,
      quality: () => fallback,
      url: () => "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    };
    return fallback as any;
  }

  if (typeof source === "string") {
    const strObj = {
      width: () => strObj,
      quality: () => strObj,
      url: () => source,
    };
    return strObj as any;
  }

  if (source.asset && !source.asset._ref && typeof source.asset.url === "string") {
    const assetObj = {
      width: () => assetObj,
      quality: () => assetObj,
      url: () => source.asset.url,
    };
    return assetObj as any;
  }

  if (source.url && typeof source.url === "string") {
    const urlObj = {
      width: () => urlObj,
      quality: () => urlObj,
      url: () => source.url,
    };
    return urlObj as any;
  }

  try {
    return builder.image(source);
  } catch {
    const errorFallback = {
      width: () => errorFallback,
      quality: () => errorFallback,
      url: () => "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    };
    return errorFallback as any;
  }
}

