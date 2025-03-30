import { useCallback, useEffect, useRef } from 'react'

export function useIsMounted() {
  let isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
