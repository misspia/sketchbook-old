import styled from 'styled-components'
import { Metrics } from '../../../themes/themes.js'

const previewGridWidth = Metrics.previewSize + Metrics.previewMargin * 2;
const outerPadding = Metrics.previewMargin;

const totalWidthMax = previewGridWidth * 3 + outerPadding * 3;
export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  width: ${totalWidthMax}px;


  @media (max-width: 800px) {
    justify-content: center;
    width: 100%;
  }
`;
