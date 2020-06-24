import * as THREE from 'three';

import Lights from './lights';
import RectLight from './rectLight';
import Floor from './floor';

import SketchManagerThree from '../sketchManagerThree';

/**
 * http://learningthreejs.com/blog/2013/08/02/how-to-do-a-procedural-city-in-100lines/
 * https://steemit.com/utopian-io/@clayjohn/learning-3d-graphics-with-three-js-or-procedural-geometry
 */
 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.cameraDistance = 100;
    this.sceneCenter = { x: 0, y: 0, z: 0 };

    this.lights = new Lights();
    this.rectLight = new RectLight({
      width: 10,
      height: 30,
    });
    this.floor = new Floor({
      width: 100,
      height: 150,
    });
  }

  unmount() {
    this.floor.dispose();
    this.rectLight.dispose();
    this.clearScene();
  }

  init() {
    this.setClearColor(0x000000);
    this.setCameraPos(0, 60, 100);
    this.lookAt(new THREE.Vector3());

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.rectLight.position.set(0, this.rectLight.height / 2, this.floor.min.z);
    this.scene.add(this.lights.ambient);
    this.scene.add(this.rectLight.pivot);
    this.scene.add(this.floor.pivot);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.rectLight.update();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
