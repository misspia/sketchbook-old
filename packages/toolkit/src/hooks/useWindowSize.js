import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const onResize = () => {
      // const { innerWidth, innerHeight } = window;
      // setWidth(innerWidth);
      // setHeight(innerHeight);
      const { offsetWidth, offsetHeight } = document.body;
      setWidth(offsetWidth);
      setHeight(offsetHeight);
    }

    onResize();

    window.addEventListener('resize', onResize);

    return () => (
      window.removeEventListener('resize', onResize)
    )
  }, []);

  return { width, height } 
}
