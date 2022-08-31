import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Routes } from './Router/routes'
import { Preview } from './Preview'
import { Sketches } from '../sketches'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;

  justify-items: center;
  
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const SketchPreviews = ({
  onLoad = (_loadedItems, _total) => { },
}) => {
  const [loadedItems, setLoadedItems] = useState(0);

  useEffect(() => {
    onLoad(loadedItems, Sketches.length);
  }, [loadedItems]);

  return (
    <Container>
      {Sketches.map((sketch, index) => (
        <Preview
          key={index}
          to={Routes.toSketch(index)}
          image={sketch.image}
          onLoad={() => (
            setLoadedItems(loadedItems + 1)
          )}
        />
      )).reverse()}
    </Container>
  )
}
