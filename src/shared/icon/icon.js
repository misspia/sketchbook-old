import React, { Component } from 'react'
import { IconElement } from './icon.styles'

class Icon extends Component {
	static defaultProps = {
		name: '',
		size: '1em',
		color: '',
		customStyle: '', // ex. 'margin:1em; opacity: 0.5;',
		hover: '' // hover styles --> ex. color: red;
	}
	render() {
		return <IconElement
  		className={`icon ${this.props.name}`}
  		size={this.props.size}
  		color={this.props.color}
  		customStyle={this.props.customStyle}
  		hover={this.props.hover} />
	}
}

export default Icon;
