import React, { useState, useEffect, useRef, useMemo } from 'react';
import hooks from 'toolkit/hooks';
import components from "toolkit/components"
import { Sketch } from './Sketch';

const { useWindowSize } = hooks
const { MediaActivator } = components

export default function Page() {
  const [isReady, setIsReady] = useState(false)
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const sketch = useMemo(() => {
    if (!canvasRef.current) {
      return;
    }
    return new Sketch(
      canvasRef.current,
      audioRef.current
    );
  }, [canvasRef.current]);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!sketch) {
      return;
    }
    sketch.resize(width, height)
  }, [sketch, width, height]);

  useEffect(() => {
    if (!sketch || !isReady) {
      return;
    }
    sketch.render();
  }, [sketch, isReady]);

  return (
    <>
      {
        !isReady &&
        <MediaActivator
          onClick={() => setIsReady(true)}
        />
      }
      <canvas ref={canvasRef}></canvas>
      <audio ref={audioRef} loop />
    </>
  )
}
