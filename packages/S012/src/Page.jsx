import React, { useEffect, useRef, useMemo } from 'react';
import hooks from 'toolkit/hooks';
import components from 'toolkit/components';
import { Sketch } from './Sketch';

const { useWindowSize } = hooks
const { Tooltip } = components

export default function Page() {
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
    if (!sketch) {
      return;
    }
    sketch.render();
  }, [sketch]);

  return (
    <>
      <Tooltip>
      Press & hold to reach level 9000
      </Tooltip>
      <canvas ref={canvasRef}></canvas>
      <audio ref={audioRef} loop />
    </>
  )
}
