import { useMemo } from 'react'
import { useLocation } from 'react-router'

type ComponentModule = {
  default: React.ComponentType<unknown>
}

// glob doesn't allow template strings, literals. So it has to be a hardcoded path.
let moduleFiles = import.meta.glob('/src/modules/**', { eager: true })

export function useDynamicComponent() {
  let location = useLocation()

  let Component = useMemo(() => {
    let params = new URLSearchParams(location.search)
    let componentName = params.get('component')
    let module = moduleFiles[`/src/modules/${componentName}/index.tsx`]

    return module ? (module as ComponentModule).default : null
  }, [location.search])

  return Component
}
