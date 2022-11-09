import { createRoot } from 'react-dom/client'
import React from 'react'
import { Router } from "./components/Router"

const container = document.getElementById('app-container')
const root = createRoot(container)
root.render(<Router />)
