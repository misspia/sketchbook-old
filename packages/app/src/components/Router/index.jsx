import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import { Routes as AppRoutes } from './routes'

import { Loader } from "../Loader"
import Home from '../Home'
import { Sketches } from "../../sketches"

const GlobalStyles = createGlobalStyle`
	body {
		margin: 0;
		font-size: 1em;
	} 
`

export const Router = () => {
	return (
		<HashRouter>
			<GlobalStyles />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route exact path={AppRoutes.home} element={<Home />} />
					{Sketches.map((Sketch, index) => (
						<Route
							exact
							key={index}
							path={`/${index}`}
							element={<Sketch.component />}
						/>
					))}
				</Routes>
			</Suspense>
		</HashRouter>
	)
}
