import styled from 'styled-components'
import { Metrics } from '../../../themes/themes.js'

const previewGridWidth = Metrics.previewSize + Metrics.previewMargin * 2;
const outerPadding = Metrics.previewMargin;

const totalWidth1 = previewGridWidth ;
const totalWidth2 = previewGridWidth * 2 + outerPadding;
const totalWidth3 = previewGridWidth * 3 + outerPadding;
// min-width: ${previewGridWidth}em;
export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  width: ${totalWidth3}px;


  @media (max-width: ${totalWidth2}px) {
    width: ${totalWidth2}px;
  }
  @media (max-width: ${totalWidth1}px) {
    width: ${totalWidth1}px;
  }
`;
