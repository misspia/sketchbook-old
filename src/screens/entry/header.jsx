import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Routes from '../../router/routes.js'

import { Icons } from '../../themes/themes.js'
import Icon from '../../shared/icon/icon.jsx'

import * as S from './entry.styles.js'

class Header extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    instructions: '',
  }
  renderBackButton() {
    return <NavLink exact to={Routes.home}>
      <Icon name={Icons.close}/>
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
