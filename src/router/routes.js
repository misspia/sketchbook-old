const HOME_ROUTE = '/';
const SKETCH_ROUTE = '/sketch/';

const Routes = {
  home: HOME_ROUTE,
  sketch: `${SKETCH_ROUTE}:index`,

  toSketch: (index) => {
    return `${SKETCH_ROUTE}${index}`;
  }
}

export default Routes;
