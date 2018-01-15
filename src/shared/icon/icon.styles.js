import styled from 'styled-components';

export const IconElement = styled.i`
	height: ${props => props.size};
	width: ${props => props.size};
	color: ${props => props.color};
	${props => props.customStyle}
	&:hover {
		${props => props.hover}
	}
`;
