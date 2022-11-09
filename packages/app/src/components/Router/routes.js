const HOME_ROUTE = '/';

export const Routes = {
  home: HOME_ROUTE,
  sketch: HOME_ROUTE,

  toSketch: (index) => {
    return `${HOME_ROUTE}${index}`;
  }
}
