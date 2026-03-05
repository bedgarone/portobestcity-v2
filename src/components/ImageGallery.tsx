import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { DEFAULT_IMAGE_SIZES, urlFor } from '@/app/utils'
import { SanityImage } from '@/app/types'
import { getImageDimensions } from '@sanity/asset-utils'

export function ImageGallery({ value }: any) {
  const { images, caption } = value

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="my-4">
      <Carousel
        className="w-full"
        opts={{
          align: 'start',
          loop: false,
        }}
      >
        <CarouselContent>
          {images.map((image: SanityImage, index: number) => {
            const imageUrl = urlFor(image.asset)?.url()
            const { width, height } = getImageDimensions(image)
            return (
              imageUrl && (
                <CarouselItem key={index}>
                  <div className="relative w-full">
                    <Image
                      src={imageUrl}
                      alt={`Gallery image ${index + 1}`}
                      width={width}
                      height={height}
                      className="h-auto w-full object-cover"
                      sizes={DEFAULT_IMAGE_SIZES}
                    />
                  </div>
                </CarouselItem>
              )
            )
          })}
        </CarouselContent>
        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2">
            <CarouselPrevious variant="ghost" className="text-blue relative left-0 translate-y-0" />
            <CarouselNext variant="ghost" className="text-blue relative right-0 translate-y-0" />
          </div>
          {caption && <p className="text-blue text-right font-sans text-xs">{caption}</p>}
        </div>
      </Carousel>
    </div>
  )
}
