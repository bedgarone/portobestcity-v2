import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="relative flex h-screen items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage: "url('assets/404_river.jpg')",
        }}
      />

      <div className="z-10 flex flex-col gap-3 bg-white/20 px-5 py-10 text-center text-white backdrop-blur-xs md:px-20">
        <p className="mb-4 text-8xl font-bold">Oups!</p>
        <h1 className="mb-3 text-3xl font-semibold">This page fell into the Douro.</h1>
        <p className="text-light-blue mb-8 font-sans text-lg">
          We searched Matosinhos, Bonfim, and even Freixo... it is not here.
        </p>
        <Link href="/">
          <Button variant="default" className="mx-auto my-2">
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  )
}
