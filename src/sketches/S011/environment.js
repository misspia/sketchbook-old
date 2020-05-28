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

    const ambient = new THREE.AmbientLight(new THREE.Color(0x12161f).convertGammaToLinear(2.2), 1);
    envScene.add(ambient);

    const lightMaterial = new THREE.MeshLambertMaterial({
      color: 0x000000,
      emissive: 0xffffff,
      emissiveIntensity: 15,
    });

    const light1 = new THREE.Mesh(geometry, lightMaterial);
    light1.position.set(5, -2, 0);
    light1.scale.set(0.1, 2, 1);
    envScene.add(light1);

    const light4 = new THREE.Mesh(geometry, lightMaterial);
    light4.position.set(-5, 2, 0);
    light4.scale.set(0.1, 2, 1);
    envScene.add(light4);

    const light2 = new THREE.Mesh(geometry, lightMaterial);
    light2.position.set(0, 5, 2);
    light2.scale.set(2, 0.1, 2);
    envScene.add(light2);

    const light3 = new THREE.Mesh(geometry, lightMaterial);
    light3.position.set(3.5, -1, -5);
    light3.scale.set(1, 1, 0.1);
    envScene.add(light3);

    return envScene;
  }
}
