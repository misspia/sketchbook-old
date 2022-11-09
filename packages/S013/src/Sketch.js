import * as THREE from 'three';
import { SketchManager } from './SketchManager';

import { Lights } from './Lights';
import { Skybox } from './Skybox';
import { Platform } from './Platform';
import { Entrance } from './Entrance';

 export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas);

    this.cameraDistance = 100;
    this.sceneCenter = { x: 0, y: 0, z: 0 };

    this.lights = new Lights();

    this.envMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0,
      side: THREE.DoubleSide,
    });

    this.skybox = new Skybox({
      width: 300,
      height: 200,
      depth: 150,
      material: this.envMaterial,
    })

    this.platform = new Platform({
      numSteps: 35,
      width: this.skybox.width * 1,
      material: this.envMaterial,
    });
    this.entrance = new Entrance({
      numArcs: 5,
      arcMaxHeight: 80,
      arcMinHeight: 50,
      arcWidth: 15,
      arcDepth: 5,
      gap: 7,
      material: this.envMaterial,
    });
  }

  unmount() {
    this.envMaterial.dispose();
    this.platform.dispose();
    this.entrance.dispose();
    this.skybox.dispose();
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.setClearColor(0x000000);

    this.setCameraPos(0, 31, this.skybox.max.z);
    this.lookAt(new THREE.Vector3(0, this.platform.max.y, this.skybox.min.z + 40));

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
    this.scene.add(this.platform.pivot);
    this.scene.add(this.entrance.pivot);

    this.entrance.arcLights.forEach(arcLight => {
      this.scene.add(arcLight.helper);
    })
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.entrance.update();

    requestAnimationFrame(() => this.draw());
  }
}
