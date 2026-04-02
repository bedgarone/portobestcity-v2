'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MAIN_CONTAINER_CLASSES, navigationPages } from '@/app/utils'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SearchBar } from '@/components/SearchBar'
import { MenuIcon, SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { WelcomeText } from './WelcomeSentence'

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigateFromMobileMenu = (page: { title: string; link: string }) => {
    router.push(page.link)
    setMobileMenuOpen(false)
  }

  return (
    <header className="mb-4">
      <div className="flex">
        <div className="[0_50%] relative h-16 w-full lg:h-26">
          <div className="absolute inset-0 overflow-hidden bg-[url('/assets/TilesRepeatMedium_Soft.png')] bg-[length:auto_170%] bg-repeat-x opacity-50" />
          <div className="from-dark-grey/8 pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t to-transparent" />
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="bg-blue flex h-16 w-16 items-center justify-center text-white lg:hidden"
            >
              <MenuIcon className="size-8" strokeWidth={1.5} />
            </button>
          </SheetTrigger>

          <SheetContent className="bg-blue gap-8 p-5 font-sans text-white">
            <SheetTitle className="sr-only">Menu</SheetTitle>

            <div className="mt-10">
              <SearchBar onNavigate={() => setMobileMenuOpen(false)} />
            </div>

            <hr className="border-t-surface-blue border-0 border-t" />

            <nav className="flex flex-col gap-8 text-2xl">
              {navigationPages.map((page) => (
                <span
                  key={page.link}
                  onClick={() => navigateFromMobileMenu(page)}
                  className="leading-none font-semibold tracking-wide uppercase"
                >
                  {page.title}
                </span>
              ))}
            </nav>

            <hr className="border-t-surface-blue border-0 border-t" />

            <WelcomeText />
          </SheetContent>
        </Sheet>
      </div>
      <div className={MAIN_CONTAINER_CLASSES}>
        <Image
          src="/assets/LogoVF_Web.png"
          alt="PortoBestCity"
          className="relative -mt-5 w-[280px] cursor-pointer p-0 lg:-mt-6 lg:w-[400px]"
          width={400}
          height={300}
          quality={100}
          priority
          role="link"
          aria-label="Go to home"
          onClick={() => {
            router.push('/')
          }}
        />
      </div>
      <div
        className={
          MAIN_CONTAINER_CLASSES + ' text-dark-blue mt-3 mb-4 hidden font-sans lg:flex lg:justify-end lg:gap-6'
        }
      >
        {navigationPages.map((page) => (
          <Link
            key={page.link}
            href={page.link}
            className="text-dark-blue hover:text-blue leading-none font-semibold tracking-wide uppercase transition-colors"
          >
            {page.title}
          </Link>
        ))}

        <SearchIcon
          strokeWidth={2}
          onClick={() => setMobileMenuOpen(true)}
          className="text-dark-blue hover:text-blue h-4 w-4 cursor-pointer transition-colors"
        />
      </div>
    </header>
  )
}
