

import { createRoot } from 'react-dom/client'
import React from 'react'
import Page from './src/Page'


export default function View() {
  return (
    <Page />
  )
}

const container = document.getElementById('S008-container')
const root = createRoot(container)
root.render(<View />)
