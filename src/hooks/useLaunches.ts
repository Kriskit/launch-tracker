import { useEffect, useState } from 'react'
import type { Launch, LaunchResponse } from '../types/launch'

const API_URL =
  'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&format=json&mode=detailed'
const CACHE_KEY = 'launch-tracker-cache'
const CACHE_TTL_MS = 5 * 60 * 1000

interface CacheEntry {
  timestamp: number
  data: Launch[]
}

function readCache(): Launch[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null
    return entry.data
  } catch {
    return null
  }
}

function writeCache(data: Launch[]): void {
  const entry: CacheEntry = { timestamp: Date.now(), data }
  localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
}

function readStaleCache(): Launch[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    return entry.data
  } catch {
    return null
  }
}

export function useLaunches() {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rateLimited, setRateLimited] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchLaunches() {
      const cached = readCache()
      if (cached) {
        setLaunches(cached)
        setLoading(false)
        return
      }

      try {
        const res = await fetch(API_URL)

        if (res.status === 429) {
          const stale = readStaleCache()
          if (!cancelled) {
            if (stale) {
              setLaunches(stale)
              setRateLimited(true)
              setLoading(false)
            } else {
              setError('Rate limited — please try again in a few minutes')
              setLoading(false)
            }
          }
          return
        }

        if (!res.ok) throw new Error(`API returned ${res.status}`)
        const json: LaunchResponse = await res.json()
        if (!cancelled) {
          setLaunches(json.results)
          writeCache(json.results)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch launches')
          setLoading(false)
        }
      }
    }

    fetchLaunches()
    return () => { cancelled = true }
  }, [])

  return { launches, loading, error, rateLimited }
}
