import styled from 'styled-components';

export const Wrapper = styled.div`
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
