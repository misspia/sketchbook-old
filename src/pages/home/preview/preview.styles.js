import styled from 'styled-components'
import Image from 'next/image'
import { Colors, Metrics, Styles } from '../../../themes'

export const Container = styled.div`
  margin: ${Metrics.previewMargin}px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: ${Metrics.previewSize}px;
  height: ${Metrics.previewSize}px;
  overflow: hidden;

  a {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    ${Styles.anchorReset}
  }
`;

export const Image = styled(Image)`
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;

  width: auto;
  height: 100%;

  filter: grayscale(60%);
  transition: 0.2s all;

  ${Container}:hover & {
    filter: grayscale(0%);
    transform: scale(1.1);
  }
`;

export const HiddenContainer = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  transition: all 0.5s;
  opacity: 0;

  ${Container}:hover & {
    background-color: ${Colors.whiteTranslucent};
    opacity: 1;
  }
`;

export const Title = styled.h2`
  font-size: 1.2em;
  letter-spacing: 0.1em;
  text-align: center;
  color: ${Colors.greyDark};
`;

export const IconWrapper = styled.div`

  margin: 0.5em;
  padding: 0.2em;
  position: absolute;
  bottom: 0;
  right: 0;

  background-color: ${Colors.thistle};
  border-radius: 0.2em;
  box-sizing: border-box;
`;
