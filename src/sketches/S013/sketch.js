import * as THREE from 'three';

import Lights from './lights';
import RectLight from './rectLight';
import Floor from './floor';

import SketchManagerThree from '../sketchManagerThree';
import Pillars from './pillars';
import Platform from './platform';
import Entrance from './entrance';

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

    this.floor = new Floor({
      width: 100,
      height: 220,
    });
    this.rectLight = new RectLight({
      width: 20,
      height: 30,
    });
    this.platform = new Platform({
      numSteps: 5,
      width: 20
    });
    this.pillars = new Pillars({
      minZ: this.floor.getZCoord(0.5),
      maxZ: this.floor.getZCoord(0.7),
      numPerSide: 3,
      gap: this.floor.width * 0.4,
    });
    this.entrance = new Entrance({
      numArcs: 5,
      arcMaxHeight: 30,
      arcMinHeight: 20,
      arcWidth: 5,
      arcDepth: 5,
      gap: 3,
    });

  }

  unmount() {
    this.floor.dispose();
    this.rectLight.dispose();
    this.clearScene();
  }

  init() {
    this.setClearColor(0x000000);
    this.setCameraPos(0, 10, 100);
    this.lookAt(new THREE.Vector3());

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.rectLight.position.set(0, this.rectLight.height / 2, this.floor.min.z);
    this.platform.position.z = this.floor.min.z + this.platform.depth / 2;

    this.scene.add(this.lights.ambient);
    this.scene.add(this.floor.pivot);
    this.scene.add(this.rectLight.pivot);
    this.scene.add(this.platform.pivot);
    // this.scene.add(this.pillars.pivot);
    this.scene.add(this.entrance.pivot);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.rectLight.update();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
