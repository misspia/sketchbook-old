import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Metrics } from '../themes'
import { Routes } from './Router/routes'
import { Preview } from './Preview'
import { Sketches } from '../sketches'

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
