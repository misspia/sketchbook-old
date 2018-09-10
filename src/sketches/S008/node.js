class Node {
  constructor() {
    this.geometry = {};
    this.material = {};
    this.mesh = {};

    this.init();
  }
  init() {
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        u_time: { type: 'f', value: 0}
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(point)
  }
  updatePos() {

  }
  updateColor() {

  }
  updateUniforms() {

  }

}

export default Node;
