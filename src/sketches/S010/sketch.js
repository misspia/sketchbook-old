import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import SimplexNoise from 'simplex-noise';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.sphere = {};
    this.material = {};
    this.geometry = {};
    this.amp = 1;
    this.noise = new SimplexNoise();
  }
  unmount() {

  }
  init() {
    this.setClearColor(0xddddff)
    this.setCameraPos(0, 50, -100);

    this.createSphere();
  }
  createSphere() {
    this.geometry = new THREE.IcosahedronGeometry(10, 4);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffcccc,
      wireframe: false,
    })
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.sphere.castShadow = true;

    this.scene.add(this.sphere);
  }
  disruptSphere() {
    this.sphere.geometry.vertices.forEach((vertex, index) => {
      const offset = this.sphere.geometry.parameters.radius;
      const time = Date.now();
      vertex.normalize();

      const distance = offset + this.noise.noise3D(
        vertex.x + time * 0.007,
        vertex.y + time * 0.008,
        vertex.z + time * 0.009,
      ) * this.amp;

      vertex.multiplyScalar(distance);
    });
    this.sphere.geometry.verticesNeedUpdate = true;
    this.sphere.geometry.normalsNeedUpdate = true;
    this.sphere.geometry.computeVertexNormals();
    this.sphere.geometry.computeFaceNormals();

  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    
    this.disruptSphere();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;

