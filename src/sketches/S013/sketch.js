import * as THREE from 'three';

import Lights from './lights';
import Floor from './floor';

import SketchManagerThree from '../sketchManagerThree';
import Pillars from './pillars';
import Platform from './platform';
import Entrance from './entrance';
import Wall from './wall';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.cameraDistance = 100;
    this.sceneCenter = { x: 0, y: 0, z: 0 };

    this.lights = new Lights();

    this.floor = new Floor({
      width: 100,
      height: 180,
    });
    this.wall = new Wall();
    this.platform = new Platform({
      numSteps: 15,
      width: this.floor.width * 0.6,
    });
    this.pillars = new Pillars({
      minZ: this.floor.getZCoord(0.5),
      maxZ: this.floor.getZCoord(0.7),
      numPerSide: 3,
      gap: this.floor.width * 0.5,
    });
    this.entrance = new Entrance({
      numArcs: 5,
      arcMaxHeight: 30,
      arcMinHeight: 20,
      arcWidth: 5,
      arcDepth: 10,
      gap: 3,
    });
  }

  unmount() {
    this.floor.dispose();
    this.platform.dispose();
    this.pillars.dispose();
    this.entrance.dispose();
    this.clearScene();
  }

  init() {
    this.setClearColor(0x000000);
    // this.setClearColor(0xffffff);
    this.setCameraPos(0, 40, 1);
    this.lookAt(new THREE.Vector3(0, 10, this.floor.min.z + 30));

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.entrance.position.set(0, this.platform.height, this.floor.min.z);
    this.platform.position.z = this.floor.min.z ;
    this.wall.position.z = this.floor.min.z - 0.5;

    this.scene.add(this.lights.ambient);
    this.scene.add(this.floor.pivot);
    this.scene.add(this.wall.pivot);
    this.scene.add(this.platform.pivot);
    // this.scene.add(this.pillars.pivot);
    this.scene.add(this.entrance.pivot);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.entrance.update();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
