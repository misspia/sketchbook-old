import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';

import Mouse from './mouse';
import Lines from './lines';
import Skybox from './skybox';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.lines = new Lines({
      num: 10,
    });

    const clippingPlanes = [
      new THREE.Plane(new THREE.Vector3(1, 0, 0), 1),
    ]
    this.skybox = new Skybox({
      size: 50,
      clippingPlanes,
    });
    this.mouse = new Mouse(this);
  }

  unmount() {
    this.mouse.dispose();
    this.lines.dispose();
    this.clearScene();
  }

  init() {
    this.setClearColor(0x111111)
    this.setCameraPos(0, 10, 10);
    this.lookAt(0, 0, 0);

    this.renderer.localClippingEnabled = true;

    this.scene.add(this.lines.pivot);
    // this.scene.add(this.skybox.pivot);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.mouse.update();

    if(this.mouse.intersection) {
      this.lines.setActive(this.mouse.intersection.object.uuid);
    } else {
      this.lines.setActive(undefined);
    }
    this.lines.update();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
