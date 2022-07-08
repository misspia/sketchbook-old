import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { Fonts } from '../../themes'
import { Routes as AppRoutes } from './routes'

import { Loader } from "../Loader"
import Home from '../Home'
import { Sketches } from "../../sketches"

const Container = styled.main`
  font-family: ${Fonts.familyBody};
  font-size: 1em;
`;

export const Router = () => {
	return (
		<HashRouter>
			<Container>
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
			</Container>
		</HashRouter>
	)
}
