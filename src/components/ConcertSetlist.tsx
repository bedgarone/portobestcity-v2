import { SetlistSong, Setlist } from '@/app/types'
import { dateFormat } from '@/app/utils'

function Row({ n, song }: { n: number; song: SetlistSong }) {
  return (
    <li className="border-medium-grey/30 grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-2 border-b border-dashed py-2">
      <span className="text-medium-grey font-sans text-xs tabular-nums">{String(n).padStart(2, '0')}</span>

      <span className="min-w-0">
        <span className="text-dark-grey text-md font-serif leading-tight font-medium wrap-break-word">
          {song.title}
        </span>

        {song.note && (
          <span className="text-dark-blue ml-2 inline-block font-sans text-[10px] tracking-wider uppercase">
            {song.note}
          </span>
        )}
      </span>
    </li>
  )
}

export default function ConcertSetlist({ value }: { value: Setlist }) {
  let songNumber = 0
  const { artist, venue, city, date, tracks } = value
  const formattedDate = dateFormat(date)

  return (
    <aside aria-label="Setlist" className="bg-surface-blue/40 relative p-5 sm:p-7">
      <header className="border-dark-blue flex flex-col gap-3 border-b-2 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-dark-blue mb-1 font-sans text-sm font-medium tracking-[0.3em] uppercase">Setlist</p>

          <h2 className="text-dark-grey font-sans text-xl leading-tight font-semibold sm:text-2xl">{artist}</h2>
        </div>

        <div className="text-medium-grey shrink-0 text-right font-sans text-[11px] leading-relaxed font-medium tracking-wider uppercase">
          <p>{venue}</p>
          {city && <p>{`${city} / ${formattedDate}`}</p>}
        </div>
      </header>

      <ol className="lg:columns-2 lg:gap-20">
        {tracks?.map((track) => {
          if (track.divider) {
            return (
              <li key={track._key} className="mt-5 break-inside-avoid">
                <div className="flex items-center gap-4" aria-hidden="true">
                  <span className="bg-dark-blue/40 h-px flex-1" />
                  <span className="text-dark-blue font-sans text-sm font-medium uppercase">{track.divider}</span>
                  <span className="bg-dark-blue/40 h-px flex-1" />
                </div>
              </li>
            )
          }

          if (track.title) {
            songNumber++

            return (
              <div key={track._key} className="break-inside-avoid">
                <Row n={songNumber} song={track} />
              </div>
            )
          }

          return null
        })}
      </ol>
    </aside>
  )
}
