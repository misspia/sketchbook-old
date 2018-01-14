import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Routes from '../../router/routes.js'
import Sketches from '../../sketches/sketches.js'

import SketchList from '../sketchList/sketchList.jsx'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
        <SketchList />
    </div>
  }
}

export default Home
