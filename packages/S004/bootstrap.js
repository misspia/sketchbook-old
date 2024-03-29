import { createRoot } from 'react-dom/client'
import React from 'react'
import Page from './src/Page'

const projectNo = require("./package.json").name

export default function View() {
  return (
    <Page />
  )
}

const container = document.getElementById(`S${projectNo}-container`)
const root = createRoot(container)
root.render(<View />)
