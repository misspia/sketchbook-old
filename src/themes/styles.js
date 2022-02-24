import styled, { css } from 'styled-components'

const Styles = {
  SectionContainer: styled.section`
    width: 100%;
    height: 100vh;
    box-sizing: border-box; 
  `,
  anchorReset: css`
		text-decoration: none;
		&:visited, &:active {
			outline: none;
		}
	`,
}

export default Styles;
