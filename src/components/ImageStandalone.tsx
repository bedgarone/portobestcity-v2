import { urlFor, DEFAULT_IMAGE_SIZES } from '@/app/utils'
import Image from 'next/image'
import { SanityImage } from '@/app/types'
import { getImageDimensions } from '@sanity/asset-utils'

export function ImageStandalone({ value }: { value: SanityImage }) {
  const imageUrl = urlFor(value.asset)?.url()
  const { width, height } = getImageDimensions(value)
  const caption = value.caption
  if (!imageUrl) {
    return null
  }
  return (
    <div>
      <Image
        src={imageUrl}
        alt={caption ?? 'Image'}
        width={width}
        height={height}
        quality={80}
        sizes={DEFAULT_IMAGE_SIZES}
        className="h-auto w-full"
        loading="lazy"
      />
      {caption && <p className="text-blue mt-1 mb-2 text-center font-sans text-xs">{caption}</p>}
    </div>
  )
}
