import React, { useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Header from './header'

import * as S from './entry.styles'

import Sketches from '../../sketches/sketches'
import MediaActivator from './mediaActivator/mediaActivator';

const Entry = ({
  match,
}) => {
  const sketchIndex = match.params.index;
  const sketch = Sketches[sketchIndex];
  const [ready, setReady] = useState(!sketch.isAudio);

  const SketchComponent = useMemo(() => (
    Sketches[sketchIndex].component
  ), [sketchIndex]);


  if (!ready) {
    return (
      <MediaActivator
        onClick={() => setReady(true)}
      />
    )
  }
  return (
    <S.Container>
      <Header
        title={sketch.title}
        instructions={sketch.instructions}
      />
      <SketchComponent ready={ready} />
    </S.Container>
  );
}

export default withRouter(Entry);
