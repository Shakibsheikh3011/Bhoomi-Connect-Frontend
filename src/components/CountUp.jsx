import { useEffect, useState } from 'react'

export default function CountUp({ target, duration = 1200 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])

  return <span>{value.toLocaleString()}</span>
}