import { Suspense } from 'react'

import { useDynamicComponent } from '~/hooks/use-dynamic-components'

import './app.css'

export function App() {
  const Component = useDynamicComponent()

  return (
    <main className="app">
      <Suspense fallback={<div>Loading...</div>}>
        {Component ? (
          <Component />
        ) : (
          <div className="no-component">No component found</div>
        )}
      </Suspense>
    </main>
  )
}
