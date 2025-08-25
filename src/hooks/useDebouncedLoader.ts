// src/hooks/useDebouncedLoader.ts
import * as React from 'react'

/**
 * Debounced loader hook
 * @param isLoading   actual loading flag (e.g. API call state)
 * @param delay       debounce delay before showing loader
 * @param minDuration minimum time loader should remain visible once shown
 */
export function useDebouncedLoader(
  isLoading: boolean,
  delay = 600,
  minDuration = 500,
) {
  const [visible, setVisible] = React.useState(false)
  const showSince = React.useRef<number | null>(null)

  React.useEffect(() => {
    let timer: number | undefined;

    if (isLoading) {
      // wait for debounce before showing
      timer = setTimeout(() => {
        showSince.current = Date.now()
        setVisible(true)
      }, delay)
    } else {
      // hide only after minDuration
      if (showSince.current) {
        const elapsed = Date.now() - showSince.current
        const remaining = Math.max(0, minDuration - elapsed)
        timer = setTimeout(() => {
          showSince.current = null
          setVisible(false)
        }, remaining)
      } else {
        setVisible(false)
      }
    }

    return () => clearTimeout(timer)
  }, [isLoading, delay, minDuration])

  return visible
}
