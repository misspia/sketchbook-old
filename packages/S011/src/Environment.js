import * as THREE from 'three';

// https://github.com/misspia/sketchbook/commit/50f0ef2ddc79c37cb0be7b10dc542e90621be95d
export class Environment {
  constructor(renderer) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileCubemapShader();
    const generatedCubeRenderTarget = pmremGenerator.fromScene(this.getEnvScene(), 0.04);
    this.cubeMap = generatedCubeRenderTarget.texture;
  }

  get envMap() {
    return this.cubeMap;
  }

  dispose() {
    this.light1.geometry.dispose();
    this.light1.material.dispose();
    this.light2.geometry.dispose();
    this.light2.material.dispose();
    this.light3.geometry.dispose();
    this.light3.material.dispose();
    this.light4.geometry.dispose();
    this.light4.material.dispose();
  }

  getEnvScene() {
    const envScene = new THREE.Scene();

    const geometry = new THREE.BoxBufferGeometry();
    geometry.deleteAttribute('uv');
    const roomMaterial = new THREE.MeshStandardMaterial({ metalness: 0, side: THREE.BackSide });
    const room = new THREE.Mesh(geometry, roomMaterial);
    room.scale.setScalar(10);
    envScene.add(room);

    const ambient = new THREE.AmbientLight(new THREE.Color(0xaaaaff).convertGammaToLinear(2.2), 0.5);
    envScene.add(ambient);

    const lightMaterial = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      emissive: 0xaaaaff,
      emissiveIntensity: 20,
    });
    this.light1 = new THREE.Mesh(geometry, lightMaterial);
    this.light1.position.set(5, -2, 0);
    this.light1.scale.set(0.1, 2, 1);
    envScene.add(this.light1);

    this.light2 = new THREE.Mesh(geometry, lightMaterial);
    this.light2.position.set(0, 5, 2);
    this.light2.scale.set(0.5, 0.5, 0.5);
    envScene.add(this.light2);

    this.light3 = new THREE.Mesh(geometry, lightMaterial);
    this.light3.position.set(3.5, -1, -5);
    this.light3.scale.set(2, 2, 2);
    envScene.add(this.light3);

    this.light4 = new THREE.Mesh(geometry, lightMaterial);
    this.light4.position.set(-5, 2, 0);
    this.light4.scale.set(2, 2, 2);
    envScene.add(this.light4);

    return envScene;
  }
  update() {

  }
}
