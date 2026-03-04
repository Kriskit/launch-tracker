import type { Launch } from '../types/launch'

interface LaunchCardProps {
  launch: Launch
}

const fallbackImg =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" fill="%23111827"><rect width="400" height="200"/><text x="200" y="105" fill="%234B5563" font-size="40" text-anchor="middle">🚀</text></svg>'
  )

export function LaunchCard({ launch }: LaunchCardProps) {
  const getStatusColor = (name: string): string => {
    const s = name.toLowerCase()
    if (s.includes('go') || s.includes('success')) return 'bg-green-500/20 text-green-400'
    if (s.includes('tbd') || s.includes('tbc')) return 'bg-yellow-500/20 text-yellow-400'
    if (s.includes('hold') || s.includes('fail') || s.includes('no go')) return 'bg-red-500/20 text-red-400'
    return 'bg-gray-500/20 text-gray-400'
  }
  const statusCls = getStatusColor(launch.status.name)

  const launchDate = new Date(launch.net)
  const dateStr = launchDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const timeStr = launchDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return (
    <article className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/40 transition-colors duration-300">
      <div className="relative h-44 overflow-hidden bg-gray-900">
        <img
          src={launch.image ?? fallbackImg}
          alt={launch.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImg
          }}
        />
        <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold uppercase rounded-full ${statusCls}`}>
          {launch.status.name}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-white font-bold text-lg leading-snug line-clamp-2">
          {launch.rocket.configuration.full_name}
        </h3>

        <p className="text-blue-400 text-sm font-medium">
          {launch.launch_service_provider.name}
        </p>

        {launch.mission && (
          <div className="space-y-1">
            <p className="text-gray-300 text-sm font-medium">
              {launch.mission.name}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
              {launch.mission.description}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 pt-1">
          <span>{launch.pad.name}</span>
          {launch.mission?.orbit && (
            <span>{launch.mission.orbit.name}</span>
          )}
        </div>

        <p className="text-gray-400 text-xs">
          {dateStr} &middot; {timeStr}
        </p>
      </div>
    </article>
  )
}
