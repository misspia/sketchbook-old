import React, { useEffect, useState } from 'react'
import Routes from '../../../router/routes'
import Preview from '../preview/preview'

import { Container } from './sketchList.styles'

import Sketches from '../../../sketches/sketches'

export default function SketchList({
  onLoad = (loadedItems, total) => {},
}) {
  const [loadedItems, setLoadedItems] = useState(0);
  const reversedList = Sketches.slice().reverse(); // display newest at top
  const total = Sketches.length - 1;

  useEffect(() => {
    onLoad(loadedItems, Sketches.length);
  }, [loadedItems]);

  // onError?
  return (
    <Container>
      {reversedList.map((sketch, index) => (
        <Preview
          key={index}
          to={Routes.toSketch(total - index)}
          title={sketch.title}
          image={sketch.image}
          isAudio={sketch.isAudio}
          onLoad={() => setLoadedItems(loadedItems + 1)}
        />
      ))}
    </Container>
  )
}
