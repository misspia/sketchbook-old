import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom'

import { Container } from './router.styles'
import Routes from './routes'

import Home from '../screens/home/home'
import Entry from '../screens/entry/entry'

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
