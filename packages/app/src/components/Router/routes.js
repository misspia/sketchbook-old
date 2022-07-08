const HOME_ROUTE = '/';
const SKETCH_ROUTE = '/sketch/';

export const Routes = {
  home: HOME_ROUTE,
  sketch: SKETCH_ROUTE,

  toSketch: (index) => {
    return `${SKETCH_ROUTE}${index}`;
  }
}
