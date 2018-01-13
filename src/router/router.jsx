import React, { Component } from 'react';
import { HashRouter, Route, Switch, NavLink } from 'react-router-dom'

import Home from '../screens/home/home.jsx'
class App extends Component {
  render() {
    return <div>
      testing
    </div>
  }
}

export default () => {
	return <HashRouter>
		<div>
			<div>
        <NavLink to='/'>home</NavLink>
        <NavLink to='/entry/0'>test0</NavLink>
        <NavLink to='/entry/1'>test1</NavLink>
        <NavLink to='/entry/2'>test2</NavLink>
      </div>
			<Switch>
				<Route exact path='/' component={App}/>
				<Route path='/entry/:index' component={Home}/>
			</Switch>
		</div>
	</HashRouter>
};
