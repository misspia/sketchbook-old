import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Routes from '../../router/routes'

import { Icons } from '@themes'
import Icon from '@components/Icon'

import * as S from './entry.styles'

class Header extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    instructions: '',
  }
  renderBackButton() {
    return <NavLink exact to={Routes.home}>
      <Icon IconComponent={Icons.close}/>
    </NavLink>
  }
  renderInstructions() {
    if(!this.props.instructions) return;
    return <S.Instructions>
      {this.props.instructions}
    </S.Instructions>
  }
  render() {
    return <S.HeaderContainer>
      {this.renderBackButton()}
      {this.renderInstructions()}
    </S.HeaderContainer>
  }
}

export default Header;
