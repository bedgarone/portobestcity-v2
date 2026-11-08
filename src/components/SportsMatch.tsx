import { FootballMatchProps, Scorer, StartingLineupProps, Team } from '@/app/types'
import { normalizeHex, readableForeground } from '@/lib/utils'
import { dateFormat } from '@/app/utils'
import { CSSProperties } from 'react'

function teamColor(teamColor: string | undefined) {
  return normalizeHex(teamColor || '#000000')
}

function Side({ team, scorers, align }: { team: Team; scorers?: Scorer[]; align: 'left' | 'right' }) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-1.5 ${
        align === 'right' ? 'items-end text-right' : 'items-start text-left'
      }`}
    >
      <span className="h-2.5 w-15" style={{ background: teamColor(team.color) }} />
      <span className="text-dark-grey text-xl leading-tight wrap-break-word sm:text-3xl">{team.name}</span>

      {scorers && scorers.length > 0 && (
        // invert order of player, minute and note if align is right! from right to left.
        <ul className="text-medium-grey mt-3 space-y-1 font-sans text-[11px] leading-snug sm:text-xs">
          {scorers.map((scorer, i) => (
            <li
              key={scorer._key || `${scorer.player}-${scorer.minute}-${i}`}
              className={`flex flex-wrap items-center gap-x-1.5 ${align === 'right' ? 'flex-row-reverse' : ''}`}
            >
              <span>{scorer.player}</span>

              <span className="text-dark-blue font-medium">{`${scorer.minute}'`}</span>

              {scorer.note && <span className="text-medium-grey/80 ml-1 text-[10px] uppercase">{scorer.note}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StartingLineup({
  lines,
  color,
  teamName,
  formation,
  direction = 'up',
  matchType = undefined,
}: StartingLineupProps) {
  const bg = normalizeHex(color || '#000000')
  const fg = readableForeground(bg)

  const style = {
    '--marker-bg': bg,
    '--marker-fg': fg,
  } as CSSProperties

  const ordered = direction === 'up' ? [...lines].reverse() : lines

  return (
    <figure className="min-w-0" style={style} aria-label={`${teamName} starting lineup`}>
      <figcaption className="border-surface-blue mb-3 flex items-baseline justify-between gap-3 border-b-2 pb-2">
        <span className="flex min-w-0 items-center gap-2">
          <span className="text-lg leading-tight wrap-break-word">{teamName}</span>
        </span>

        {formation && (
          <span className="text-muted-foreground shrink-0 font-sans text-xs tracking-wider">{formation}</span>
        )}
      </figcaption>

      <div className="pitch relative overflow-hidden px-1 py-5 sm:px-4 sm:py-7">
        {/* FOOTBALL */}
        {matchType === 'football' && (
          <>
            <div aria-hidden className="border-light-blue pointer-events-none absolute inset-2 border" />
            <div aria-hidden className="bg-light-blue pointer-events-none absolute inset-x-2 top-1/2 h-px" />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            />
            <div
              aria-hidden
              className={`border-light-blue pointer-events-none absolute left-1/2 h-10 w-2/5 -translate-x-1/2 border ${
                direction === 'up' ? 'bottom-2 border-b-0' : 'top-2 border-t-0'
              }`}
            />
          </>
        )}

        {/* BASKET */}
        {matchType === 'basket' && (
          <>
            <div aria-hidden className="border-light-blue pointer-events-none absolute inset-2 border" />
            <div aria-hidden className="bg-light-blue pointer-events-none absolute inset-x-2 top-1/3 h-px" />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute top-1/3 left-1/2 size-15 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute bottom-2 left-1/2 h-1/3 w-20 -translate-x-1/2 border border-b-0"
            />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute bottom-1/4 left-1/2 size-15 -translate-x-1/2 rounded-full border"
            />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute bottom-2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 rounded-t-[50%] border-x border-t"
            />
          </>
        )}

        {/* HANDBALL */}
        {matchType === 'handball' && (
          <>
            <div aria-hidden className="border-light-blue pointer-events-none absolute inset-2 border" />
            <div aria-hidden className="bg-light-blue pointer-events-none absolute inset-x-2 top-1/3 h-px" />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute top-1/3 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute bottom-2 left-1/2 h-1/2 w-[90%] -translate-x-1/2 rounded-t-[100%] border-x border-t border-dashed"
            />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute bottom-2 left-1/2 h-1/3 w-[70%] -translate-x-1/2 rounded-t-[50%] border-x border-t"
            />
          </>
        )}

        {/* HOCKEY (ROLLERS) */}
        {matchType === 'hockey' && (
          <>
            <div aria-hidden className="border-light-blue pointer-events-none absolute inset-2 border" />
            <div aria-hidden className="bg-light-blue pointer-events-none absolute inset-x-2 top-1/3 h-px" />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute top-1/3 left-1/2 size-15 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute bottom-4 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            />
            <div
              aria-hidden
              className="border-light-blue pointer-events-none absolute bottom-10 left-1/2 h-1/4 w-1/3 -translate-x-1/2 border"
            />
          </>
        )}

        <ol className="relative flex h-full flex-col justify-around gap-4 sm:gap-8">
          {ordered.map((line, li) => (
            <li key={li}>
              <ul
                className="grid gap-x-0.5 sm:gap-x-2"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(line.length, 1)}, minmax(0, 1fr))`,
                }}
              >
                {line.map((pl) => (
                  <li key={pl._key} className="flex min-w-0 flex-col items-center gap-1 text-center">
                    <span
                      className="ring-background/80 grid h-8 w-8 shrink-0 place-items-center rounded-full font-sans text-xs font-semibold ring-2 sm:h-10 sm:w-10 sm:text-sm"
                      style={{
                        background: 'var(--marker-bg)',
                        color: 'var(--marker-fg)',
                      }}
                    >
                      {pl.number ?? '–'}
                    </span>

                    <span className="text-foreground w-full max-w-[6.5rem] px-0.5 text-[10px] leading-tight font-medium wrap-break-word hyphens-auto sm:text-xs">
                      {pl.name}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  )
}

export default function FootballMatch({ value }: { value: FootballMatchProps }) {
  const { competition, matchday, venue, date, score, scorers, teams, matchType } = value

  const formattedDate = date && dateFormat(date)

  const homeLines = teams.home.lines?.map((line) => line.players) || []
  const awayLines = teams.away.lines?.map((line) => line.players) || []

  return (
    <div className="space-y-8">
      {/* SCOREBOARD */}
      <section aria-label="Match scoreboard" className="border-surface-blue relative border-t-15 border-b-8 py-4">
        <div className="text-medium-grey mb-3 flex shrink-0 justify-between text-right font-sans text-[11px] leading-relaxed font-medium tracking-wider uppercase">
          <span className="text-left">{[competition, matchday].filter(Boolean).join(' / ')}</span>
          <span className="text-right">{[venue, formattedDate].filter(Boolean).join(' / ')}</span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-3 sm:gap-6">
          <Side team={teams.home} scorers={scorers?.home} align="left" />

          <div className="flex flex-col items-center">
            <span className="text-dark-grey mt-2 font-sans text-4xl leading-none tabular-nums sm:text-5xl">
              {score?.home ?? 0}
              <span className="text-surface-blue mx-4 text-3xl sm:mx-6">x</span>
              {score?.away ?? 0}
            </span>
          </div>

          <Side team={teams.away} scorers={scorers?.away} align="right" />
        </div>
      </section>

      {/* STARTING LINEUPS */}
      {(homeLines.length > 0 || awayLines.length > 0) && (
        <section aria-label="Starting lineups">
          <div className="mb-4">
            <h3 className="text-dark-blue font-sans text-xl tracking-widest uppercase">Starting Lineups</h3>
          </div>

          <div
            className={`grid grid-cols-1 gap-6 ${
              homeLines.length > 0 && awayLines.length > 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
            }`}
          >
            {homeLines.length > 0 && (
              <StartingLineup
                teamName={teams.home.name}
                color={teams.home.color}
                lines={homeLines}
                direction="up"
                matchType={matchType}
              />
            )}

            {awayLines.length > 0 && (
              <StartingLineup
                teamName={teams.away.name}
                color={teams.away.color}
                lines={awayLines}
                direction="up"
                matchType={matchType}
              />
            )}
          </div>
        </section>
      )}
    </div>
  )
}
