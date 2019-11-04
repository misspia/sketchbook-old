import React from 'react'
import * as S from './icon.styles'

export default function Icon({
	name = '',
	size = '1em',
	color = '',
	customStyle = '', // ex. 'margin:1em; opacity: 0.5;',
	hover = '' // hover styles --> ex. color: red;
}) {
	
	return (
		<S.Wrapper
			size={size}
			color={color}
			customStyles={customStyle}
			hover={hover}
		>
			<ion-icon name={name}/>
		</S.Wrapper>
	)
}
