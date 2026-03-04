import { useMemo } from 'react'

export function StarField() {
  const stars = useMemo(() => {
    const result: { x: number; y: number; size: number; opacity: number; delay: number }[] = []
    for (let i = 0; i < 80; i++) {
      const seed = (i * 7919 + 104729) % 100000
      result.push({
        x: (seed % 1000) / 10,
        y: ((seed * 31) % 1000) / 10,
        size: 1 + (seed % 3),
        opacity: 0.2 + ((seed % 60) / 100),
        delay: (seed % 5000) / 1000,
      })
    }
    return result
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${3 + star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
