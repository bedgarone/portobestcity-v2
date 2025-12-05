'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MAIN_CONTAINER_CLASSES, navigationPages } from '@/app/utils'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SearchBar } from '@/components/SearchBar'
import { MenuIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigateFromMobileMenu = (page: { title: string; link: string }) => {
    router.push(page.link)
    setMobileMenuOpen(false)
  }

  return (
    <header>
      <div className="flex">
        <div className="relative flex-1">
          <div className="[0_50%] h-16 w-full overflow-hidden bg-[url('/assets/TilesRepeatMedium_Soft.png')] bg-[length:auto_170%] bg-repeat-x opacity-50 lg:h-26"></div>
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
              {/* TBD onClick (close menu + router.push) */}
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

            <p className="font-serif text-lg italic">
              Welcome to Porto! <br />
              We respect your <strong>privacy</strong>: no tracking, no cookies consent, and no ads chasing you around.
              Just genuine Portuense warmth, Douro magic, and freedom to explore.
            </p>
          </SheetContent>
        </Sheet>
      </div>
      <div className={MAIN_CONTAINER_CLASSES + ' -mt-5'}>
        <Image
          src="/assets/LogoVF_Web.png"
          alt="PortoBestCity"
          className="relative"
          width={250}
          height={300}
          quality={100}
          priority
        />
      </div>
    </header>
  )
}
