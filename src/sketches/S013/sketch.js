import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';

import Lights from './lights';
import Skybox from './Skybox';
import Pillars from './pillars';
import Platform from './platform';
import Entrance from './entrance';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.cameraDistance = 100;
    this.sceneCenter = { x: 0, y: 0, z: 0 };

    const envColor = 0xffffff;

    this.lights = new Lights();

    this.envMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0,
      side: THREE.DoubleSide,
    });

    this.skybox = new Skybox({
      width: 200,
      height: 200,
      depth: 200,
      material: this.envMaterial,
    })

    this.platform = new Platform({
      numSteps: 15,
      width: this.skybox.width * 1,
      color: envColor,
    });
    this.pillars = new Pillars({
      minZ: this.skybox.getZCoord(0.5),
      maxZ: this.skybox.getZCoord(0.7),
      numPerSide: 3,
      gap: this.skybox.width * 0.5,
      color: envColor,
    });
    this.entrance = new Entrance({
      numArcs: 5,
      arcMaxHeight: 50,
      arcMinHeight: 35,
      arcWidth: 9,
      arcDepth: 15,
      gap: 5,
      color: envColor,
    });
  }

  unmount() {
    this.envMaterial.dispose();
    this.floor.dispose();
    this.wall.dispose();
    this.platform.dispose();
    this.pillars.dispose();
    this.entrance.dispose();
    this.clearScene();
  }

  init() {
    this.setClearColor(0x000000);
    this.setCameraPos(0, 40, 28);
    this.lookAt(new THREE.Vector3(0, 10, this.skybox.min.z + 30));

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    const offsetZ = 0.1;
    this.entrance.position.set(0, this.platform.height, this.skybox.min.z + offsetZ);
    this.platform.position.z = this.skybox.min.z + offsetZ;
    this.skybox.position.y = this.skybox.height / 2;

    this.scene.add(this.lights.ambient);
    this.scene.add(this.lights.directional);
    this.scene.add(this.skybox.pivot);
    // this.scene.add(this.pillars.pivot);
    this.scene.add(this.platform.pivot);
    this.scene.add(this.entrance.pivot);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.entrance.update();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
