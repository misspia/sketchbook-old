

import { createRoot } from 'react-dom/client'
import React from 'react'


export default function View() {
  return (
    <div>sketchbook-kit</div>
  )
}

const container = document.getElementById('sketchbook-kit-container')
const root = createRoot(container)
root.render(<View />)
