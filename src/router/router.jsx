import React, { Component } from 'react';
import { HashRouter, Route, Switch, NavLink } from 'react-router-dom'

import { Container, Nav } from './router.styles.js'
import Routes from './routes.js'

import Home from '../screens/home/home.jsx'
import SketchList from '../screens/sketchList/sketchList.jsx'
import Entry from '../screens/entry/entry.jsx'

class AppRouter extends Component {
  render() {
    return <HashRouter>
  		<Container>
  			<Nav>
          <NavLink exact to='/'>home</NavLink>
          <NavLink to={Routes.toSketch(0)}>test0</NavLink>
          <NavLink to={Routes.toSketch(1)}>test1</NavLink>
        </Nav>
  			<Switch>
  				<Route exact path={Routes.home} component={Home}/>
  				<Route path={Routes.sketch} component={Entry}/>
  			</Switch>
  		</Container>
  	</HashRouter>
  }
}

export default AppRouter;
