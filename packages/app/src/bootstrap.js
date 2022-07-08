
// import { createRoot } from 'react-dom/client'
// import React, { Suspense } from 'react'

// const S000 = React.lazy(() => import('S000/Page'))
// const S001 = React.lazy(() => import('S001/Page'))

// const App = () => {
//   return (
//     <div>
//       <h1>app</h1>
//       <Suspense fallback={"loading..."} >
//         <S000 />
//       </Suspense>
//       <Suspense fallback={"loading..."} >
//         <S001 />
//       </Suspense>
//     </div>
//   )
// }

// const container = document.getElementById('app-container')
// const root = createRoot(container)
// root.render(<App />)



import { createRoot } from 'react-dom/client'
import React from 'react'
import { Router } from "./components/Router"

const container = document.getElementById('app-container')
const root = createRoot(container)
root.render(<Router />)
