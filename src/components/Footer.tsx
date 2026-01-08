import React from 'react'
import { MAIN_CONTAINER_CLASSES, navigationPages, aboutPages } from '@/app/utils'
import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="mt-10 font-sans text-white">
      <div
        className="h-10 w-full lg:h-6"
        style={{
          backgroundImage: 'url("/assets/FooterTilesRepeat.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: '0 0',
        }}
      />
      <div className="bg-dark-blue py-8">
        <div className={`${MAIN_CONTAINER_CLASSES} flex flex-col space-y-8`}>
          <div>
            <Link href="/">
              <Image
                src="/assets/FooterLogoWeb.png"
                alt="PortoBestCity"
                className="relative cursor-pointer p-0"
                width={250}
                height={300}
                quality={100}
                role="link"
                aria-label="Go to home"
              />
            </Link>
            <div className="mt-2">ERC n. 127874</div>
          </div>
          <div className="flex flex-col space-y-4 text-lg">
            {navigationPages.map((page) => (
              <Link
                key={page.link}
                href={page.link}
                className="text-light-blue hover:text-blue leading-none font-semibold tracking-wide uppercase transition-colors"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-blue py-6">
        <div className={MAIN_CONTAINER_CLASSES}>
          <div className="text-md flex flex-col">
            <span>Reach us via:</span>
            <a href="mailto:contact@portobest.city">
              <span className="text-lg font-semibold">contact@portobest.city</span>
            </a>
            <div className="mt-4 flex flex-col space-y-2 text-sm">
              {aboutPages.map((page) => (
                <Link
                  key={page.link}
                  href={page.link}
                  className="hover:text-light-blue font-semibold transition-colors"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark-blue py-3">
        <p className="text-surface-blue text-center text-sm">&copy; {new Date().getFullYear()} Porto Best City</p>
      </div>
    </footer>
  )
}

export default Footer
