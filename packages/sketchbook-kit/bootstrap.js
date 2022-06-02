

import { createRoot } from 'react-dom/client'
import React from 'react'


export default function View() {
  return (
    <></>
  )
}

const container = document.getElementById('sketchbook-kit-container')
const root = createRoot(container)
root.render(<View />)
