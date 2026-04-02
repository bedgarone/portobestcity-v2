export function WelcomeText({ className }: { className?: string }) {
  return (
    <p className={`font-serif text-lg italic ${className ?? ''}`}>
      Welcome to Porto. <br />
      We respect your <strong>privacy</strong>: no tracking, no cookies consent, and no ads chasing you around. Just
      genuine Portuense warmth, Douro magic, and freedom to explore.
    </p>
  )
}
