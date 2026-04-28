import { useEffect, useState } from 'react'

/** Counts from 0 to `end` over `duration` ms while `enabled`; all updates happen inside rAF (no sync setState in effect body). */
export function useAnimatedCounter(
  end: number,
  duration = 2000,
  enabled = true
) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let startTime: number | null = null
    let frame = 0
    let cancelled = false

    const step = (timestamp: number) => {
      if (cancelled) return
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.floor(eased * end))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [end, duration, enabled])

  return enabled ? count : 0
}
