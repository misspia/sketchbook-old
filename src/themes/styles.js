import styled, { css } from 'styled-components'

const Styles = {
  SectionContainer: styled.section`
    width: 100%;
    min-height: 100vh;
  `,
  anchorReset: css`
		text-decoration: none;
		&:visited, &:active {
			outline: none;
		}
	`,
}

export default Styles;
