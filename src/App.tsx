import { useLaunches } from './hooks/useLaunches'
import { Countdown } from './components/Countdown'
import { LaunchCard } from './components/LaunchCard'
import { StarField } from './components/StarField'

export default function App() {
  const { launches, loading, error } = useLaunches()

  const nextLaunch = launches.find(
    (l) => new Date(l.net).getTime() > Date.now()
  ) ?? launches[0]

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <StarField />

      <header className="relative z-10 text-center pt-8 pb-2 px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          🚀 Space Launch Tracker
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Live upcoming launches from around the world
        </p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 text-lg mb-2">Something went wrong</p>
            <p className="text-gray-500 text-sm">{error}</p>
            <button
              onClick={() => {
                localStorage.removeItem('launch-tracker-cache')
                window.location.reload()
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && launches.length > 0 && (
          <>
            {nextLaunch && <Countdown launch={nextLaunch} />}
            <div className="border-t border-gray-800 my-6" />
            <h2 className="text-xl font-semibold text-gray-300 mb-6">
              Upcoming Launches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {launches.map((launch) => (
                <LaunchCard key={launch.id} launch={launch} />
              ))}
            </div>
          </>
        )}

        {!loading && !error && launches.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No upcoming launches found.
          </p>
        )}
      </main>

      <footer className="relative z-10 text-center py-6 text-gray-600 text-xs">
        Data from The Space Devs &middot; Cached 5 min to respect rate limits
      </footer>
    </div>
  )
}
