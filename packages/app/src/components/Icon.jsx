import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	height: ${props => props.size};
	width: ${props => props.size};
	color: ${props => props.color};

	&:hover {
		${props => props.hover}
	}

	${props => props.customStyles}
`;


export const Icon = ({
	name = '',
	size = '1em',
	color = '',
	customStyle = '', // ex. 'margin:1em; opacity: 0.5;',
	hover = '' // hover styles --> ex. color: red;
}) => {
	
	return (
		<Wrapper
			size={size}
			color={color}
			customStyles={customStyle}
			hover={hover}
		>
			<ion-icon name={name}/>
		</Wrapper>
	)
}
