import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Routes from '../../router/routes.js'

import { Icons } from '../../themes/themes.js'
import Icon from '../../shared/icon/icon.jsx'

import { HeaderContainer, Title } from './entry.styles.js'

class Header extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    title: ''
  }
  renderBackButton() {
    return <NavLink exact to={Routes.home}>
      <Icon name={Icons.close}/>
    </NavLink>
  }
  renderTitle() {
    return <Title>
      {/* {this.props.title} */}
    </Title>
  }
  leading
  render() {
    return <HeaderContainer>
      {this.renderBackButton()}
      {this.renderTitle()}
    </HeaderContainer>
  }
}

export default Header;
