import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export function useCountdown(targetIso: string | null): CountdownParts | null {
  const [parts, setParts] = useState<CountdownParts | null>(null)

  useEffect(() => {
    if (!targetIso) {
      setParts(null)
      return
    }

    const target = targetIso

    function calc(): CountdownParts {
      const diff = new Date(target).getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: diff }
      const s = Math.floor(diff / 1000)
      return {
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        minutes: Math.floor((s % 3600) / 60),
        seconds: s % 60,
        total: diff,
      }
    }

    setParts(calc())
    const id = setInterval(() => setParts(calc()), 1000)
    return () => clearInterval(id)
  }, [targetIso])

  return parts
}
