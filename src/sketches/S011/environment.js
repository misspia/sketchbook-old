import * as THREE from 'three';

// https://github.com/misspia/sketchbook/commit/50f0ef2ddc79c37cb0be7b10dc542e90621be95d
export default class Environment {
  constructor(renderer) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileCubemapShader();
    const generatedCubeRenderTarget = pmremGenerator.fromScene(this.getEnvScene(), 0.04);
    this.cubeMap = generatedCubeRenderTarget.texture;
  }

  get envMap() {
    return this.cubeMap;
  }

  getEnvScene() {
    const envScene = new THREE.Scene();

    const geometry = new THREE.BoxBufferGeometry();
    geometry.deleteAttribute('uv');
    const roomMaterial = new THREE.MeshStandardMaterial({ metalness: 0, side: THREE.BackSide });
    const room = new THREE.Mesh(geometry, roomMaterial);
    room.scale.setScalar(10);
    envScene.add(room);

    const ambient = new THREE.AmbientLight(new THREE.Color(0xffffff).convertGammaToLinear(2.2), 0.3);
    envScene.add(ambient);

    const material1 = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      emissive: 0x0000ff,
      emissiveIntensity: 15,
    });
    const light1 = new THREE.Mesh(geometry, material1);
    light1.position.set(5, -2, 0);
    light1.scale.set(0.1, 2, 1);
    envScene.add(light1);

    const material2 = new THREE.MeshLambertMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 15,
    });
    const light2 = new THREE.Mesh(geometry, material2);
    light2.position.set(0, 5, 2);
    light2.scale.set(5, 5, 5);
    envScene.add(light2);

    const material3 = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
      emissive: 0x00ff00,
      emissiveIntensity: 15,
    });
    const light3 = new THREE.Mesh(geometry, material3);
    light3.position.set(3.5, -1, -5);
    light3.scale.set(5, 5, 5);
    envScene.add(light3);

    const material4 = new THREE.MeshLambertMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 15,
    });
    const light4 = new THREE.Mesh(geometry, material4);
    light4.position.set(-5, 2, 0);
    light4.scale.set(5, 5, 5);
    envScene.add(light4);


    return envScene;
  }

  update() {

  }
}
