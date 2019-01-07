import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom'

import { Container, Nav } from './router.styles.js'
import Routes from './routes.js'

import Home from '../screens/home/home.jsx'
import Entry from '../screens/entry/entry.jsx'

class AppRouter extends Component {
  render() {
    return <Router>
  		<Container>
  			<Switch>
  				<Route exact path={Routes.home} component={Home}/>
  				<Route path={Routes.sketch} component={Entry}/>
  			</Switch>
  		</Container>
  	</Router>
  }
}

export default AppRouter;
