import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Colors, Metrics, Styles } from '../themes'

const Container = styled.div`
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

const Image = styled.img`
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

const HiddenContainer = styled.div`
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

export const Preview = ({
  to = '',
  image = '',
  onLoad = () => {},

}) => {
    return (
      <Container>
        <Image 
          src={image} 
          onLoad={onLoad}
        />
        <NavLink to={to} />
        <HiddenContainer>
        </HiddenContainer>
      </Container>
    );
}
