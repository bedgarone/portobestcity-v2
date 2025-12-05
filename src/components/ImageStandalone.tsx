import { urlFor } from '../app/utils'
import Image from 'next/image'
import { SanityImage } from '../app/types'

export function ImageStandalone({ value }: { value: SanityImage }) {
  const imageUrl = urlFor(value.asset)?.url()
  const caption = value.caption
  if (!imageUrl) {
    return null
  }
  return (
    // <Image
    //   src={imageUrl}
    //   alt={'Imagem do post'} //CHANGE THIS TO A DYNAMIC ALT TEXT IF NEEDED
    //   width={800}
    //   height={600}
    //   className="my-8 rounded-lg"
    // />
    <div>
      <img src={imageUrl} alt="Imagem do post" className="rounded-lg" width={800} height={600} />
      {caption && <p className="mb-2 text-center text-gray-500 italic">{caption}</p>}
    </div>
  )
}
