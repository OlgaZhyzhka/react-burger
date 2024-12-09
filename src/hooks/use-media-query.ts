import { useState, useEffect } from 'react'

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)

    const listener = (): void => setMatches(media.matches)
    media.addEventListener('change', listener)
    return (): void => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export default useMediaQuery
