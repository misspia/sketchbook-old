import React, { Component } from 'react';

class Entry extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentWillUnMount() {
    // TODO remove canvas
    console.log('unmounting sketch', this.props.match.params.index)
  }
  render() {
    return <div>
        sketch entry {this.props.match.params.index}
    </div>
  }
}

export default Entry;
