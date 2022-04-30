import React from 'react'
import * as S from './icon.styles'
import { AiOutlineClose } from "react-icons/ai"


export default function Icon({
	IconComponent = AiOutlineClose,
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
			<IconComponent />
		</S.Wrapper>
	)
}
