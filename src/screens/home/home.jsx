import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('PARAM', this.props.match.params)
    return <div>
        home component
    </div>
  }
}

export default Home
