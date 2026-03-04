import { useCountdown } from '../hooks/useCountdown'
import type { Launch } from '../types/launch'

interface CountdownProps {
  launch: Launch
}

const fallbackHeroImg =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" fill="%230f172a"><rect width="800" height="400"/><text x="400" y="220" fill="%23334155" font-size="60" text-anchor="middle">🚀</text></svg>'
  )

export function Countdown({ launch }: CountdownProps) {
  const countdown = useCountdown(launch.net)

  const pad = (n: number): string => n.toString().padStart(2, '0')

  const bgImage = launch.image || fallbackHeroImg

  return (
    <section className="relative overflow-hidden rounded-2xl mb-6">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/40" />
      </div>

      <div className="relative z-10 text-center py-12 sm:py-20 px-4">
        <p className="text-blue-400 text-sm uppercase tracking-[0.25em] mb-2">
          Next Launch
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 max-w-2xl mx-auto">
          {launch.mission?.name || launch.name}
        </h2>
        <p className="text-gray-400 text-sm mb-1">
          {launch.rocket.configuration.full_name} &middot; {launch.launch_service_provider.name}
        </p>
        <p className="text-gray-500 text-xs mb-8">
          📍 {launch.pad.location.name}
        </p>

        {countdown && countdown.total > 0 ? (
          <div className="flex justify-center gap-3 sm:gap-5">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Min', value: countdown.minutes },
              { label: 'Sec', value: countdown.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="bg-gray-800/80 border border-blue-500/30 rounded-xl px-3 py-2 sm:px-5 sm:py-3 min-w-[60px] sm:min-w-[85px] backdrop-blur-sm">
                  <span className="text-3xl sm:text-5xl font-mono font-bold text-white tabular-nums">
                    {pad(value)}
                  </span>
                </div>
                <span className="text-xs text-blue-300/60 uppercase tracking-wider mt-2">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-2xl font-bold text-green-400 animate-pulse">Liftoff! 🚀</p>
        )}

        <p className="mt-6 text-xs text-gray-500">
          {new Date(launch.net).toLocaleString(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
          })}
        </p>

        <StatusBadge status={launch.status.name} />
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getColor = (name: string): string => {
    const s = name.toLowerCase()
    if (s.includes('go') || s.includes('success')) return 'bg-green-500/20 text-green-400 border-green-500/30'
    if (s.includes('tbd') || s.includes('tbc')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    if (s.includes('hold') || s.includes('fail') || s.includes('no go')) return 'bg-red-500/20 text-red-400 border-red-500/30'
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
  const cls = getColor(status)

  return (
    <span className={`inline-block mt-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider border rounded-full ${cls}`}>
      {status}
    </span>
  )
}
