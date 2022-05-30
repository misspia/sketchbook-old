
import { createRoot } from 'react-dom/client'
import React, { Suspense } from 'react'

const S000 = React.lazy(() => import('S000/Page'))
// const Test = React.lazy(() => import('S000/TestComponent'))

// console.debug("[S000]", S000)

const App = () => {
  return (
    <div>
      <h1>app</h1>
      <Suspense fallback={"loading..."} >
        <S000 />
      </Suspense>
    </div>
  )
}

const container = document.getElementById('app-container')
const root = createRoot(container)
root.render(<App />)
