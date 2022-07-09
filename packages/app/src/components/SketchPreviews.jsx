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

/**
 * https://github.com/facebook/react/issues/17306
 * https://www.google.com/search?q=react+18+image+onload+not+triggering+suspense&rlz=1C1CHBF_enNL926NL926&sxsrf=ALiCzsaqKJmnWaGIlDryn0_Cf_0JyF7Rfg%3A1657292824714&ei=GEjIYo6kK9qS8gLVwZzACA&ved=0ahUKEwiOkOzwyOn4AhVaiVwKHdUgB4gQ4dUDCA4&uact=5&oq=react+18+image+onload+not+triggering+suspense&gs_lcp=Cgdnd3Mtd2l6EAMyBQghEKABOgcIABBHELADOggIIRAeEBYQHToHCCEQChCgAUoECEEYAEoECEYYAFBPWJ0NYJYOaAFwAXgAgAGMAYgBlQeSAQM0LjWYAQCgAQHIAQjAAQE&sclient=gws-wiz
 * 
 */
export const SketchPreviews = ({
  onLoad = (_loadedItems, _total) => {},
}) => {
  const [loadedItems, setLoadedItems] = useState(0);

  useEffect(() => {
    onLoad(loadedItems, Sketches.length);
  }, [loadedItems]);

  return (
    Sketches.map((sketch, index) => (
      <Preview
        key={index}
        to={Routes.toSketch(index)}
        title={sketch.title}
        image={sketch.image}
        isAudio={sketch.isAudio}
        onLoad={() => {
          console.debug('loaded')
          setLoadedItems(loadedItems + 1)
        }}
      />
    ))
  )
}
