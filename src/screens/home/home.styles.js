import styled from 'styled-components'
import { Colors, Styles } from '../../themes/themes.js'

export const Container = Styles.SectionContainer.extend`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.cream};
`;
