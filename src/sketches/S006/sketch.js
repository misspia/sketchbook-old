import * as THREE from 'three';
import vert from './vertex.glsl'
import frag from './fragment.glsl'
import SketchManagerThree from '../sketchManagerThree.js'

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.geometry = {};
    this.material = {};
    this.spotLight = {};
    this.ambientLight = {};
  }
  init() {
    this.disableOrbitControls();
    this.setClearColor(0xf1ebeb);
    this.setCameraPos(0, 2, -6);
    this.createCenterPiece();

    const geometry = this.createSpehereGeometry();
    console.log(geometry)
  }
  createCenterPiece() {
    this.geometry = new THREE.IcosahedronGeometry(1, 2);
    this.geometry.computeFlatVertexNormals();
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        u_time: { type: 'f', value: 0 },
      }
    });
    const sphere = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(sphere);
  }
  /**
   * https://threejs.org/docs/#api/en/core/BufferGeometry
   * https://stackoverflow.com/a/969880
   */
  createSpehereGeometry() {
    const geometry = new THREE.BufferGeometry();
    let vertices = []; 
    for(let i = 0; i < 200; i ++) {
      vertices.push(
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      );
    }
    const positionAttribute = new THREE.BufferAttribute(
      new Float32Array(vertices), 3
    );
    geometry.addAttribute('position', positionAttribute);
    return geometry;
  }
  draw() {
    this.material.uniforms.u_time.value = this.getUTime();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
