import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Routes from '../../router/routes.js'
import Sketches from '../../sketches/sketches.js'

class SketchList extends Component {
  constructor(props) {
    super(props);
  }
  renderList() {
    return Sketches.map((sketch, index) => {
      return this.renderPreview(sketch, index);
    })
  }
  renderPreview(sketch, index) {
    const path = Routes.toSketch(index);
    
    return <NavLink
            key={index}
            to={path}>
      {sketch.title}
    </NavLink>
  }
  render() {
    return <div>
        sketch list
        {this.renderList()}
    </div>
  }
}

export default SketchList;
