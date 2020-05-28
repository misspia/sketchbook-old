import PP from '../postProcessor';

export default class EffectManager {
  constructor(context) {
    this.context = context;
    this.pp = new PP(this.context);

    this.init();
  }

  init() {

  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }
}
