import { useCountdown } from '../hooks/useCountdown'
import type { Launch } from '../types/launch'

interface CountdownProps {
  launch: Launch
}

export function Countdown({ launch }: CountdownProps) {
  const countdown = useCountdown(launch.net)

  const pad = (n: number): string => n.toString().padStart(2, '0')

  return (
    <section className="text-center py-10 px-4">
      <p className="text-blue-400 text-sm uppercase tracking-[0.25em] mb-2">
        Next Launch
      </p>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-1 max-w-2xl mx-auto">
        {launch.name}
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        {launch.launch_service_provider.name} &middot; {launch.pad.location.name}
      </p>

      {countdown && countdown.total > 0 ? (
        <div className="flex justify-center gap-4 md:gap-6">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Min', value: countdown.minutes },
            { label: 'Sec', value: countdown.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-mono font-bold text-white">
                {pad(value)}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-2xl font-bold text-green-400">Liftoff! 🚀</p>
      )}

      <StatusBadge status={launch.status.name} />
    </section>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'Go for Launch': 'bg-green-500/20 text-green-400 border-green-500/30',
    'TBD': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Launch Successful': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }
  const cls = colors[status] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30'

  return (
    <span className={`inline-block mt-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider border rounded-full ${cls}`}>
      {status}
    </span>
  )
}
