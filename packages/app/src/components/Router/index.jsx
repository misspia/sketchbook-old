import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import { Fonts } from '../../themes'
import { Routes as AppRoutes } from './routes'

import { Loader } from "../Loader"
import Home from '../Home'
import { Sketches } from "../../sketches"

const GlobalStyles = createGlobalStyle`
	body {
		margin: 0;
		font-family: ${Fonts.familyBody};
		font-size: 1em;
	} 
	html, body, #app-container {
		width: 100%;
		height: 100%;
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
