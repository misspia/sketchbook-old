import styled from 'styled-components'
import { Metrics } from '../../../themes/themes.js'

const previewGridWidth = Metrics.previewSize + Metrics.previewMargin * 2;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  width: 90%;
  max-width: ${previewGridWidth * 3}em;
  min-width: ${previewGridWidth}em;
`;
