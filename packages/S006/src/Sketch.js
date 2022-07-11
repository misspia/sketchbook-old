import * as THREE from 'three';
import vert from './vertex.glsl'
import frag from './fragment.glsl'
import { SketchManager } from './SketchManager';
import utils from './utils';

/**
 * https://twitter.com/motions_work/status/927551410853396486
 */
export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.geometry = {};
    this.material = {};
    this.spotLight = {};
    this.ambientLight = {};
    this.isMouseDown = false;
    this.displacement = 0;
    this.displacementInc = 0.02;
  }

  unmount() {
    this.geometry.dispose();
    this.material.dispose();
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.setClearColor(0xf1ebeb);
    this.setCameraPos(0, 2, -6);
    this.createCenterPiece();

    this.createMouseListener();

    this.canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
    });
    this.canvas.addEventListener('mouseup', (e) => {
      this.isMouseDown = false;
    });

    /**
     * mobile
     */
    this.canvas.addEventListener('touchstart', (e) => {
      this.isMouseDown = true;
    });
    this.canvas.addEventListener('touchend', (e) => {
      this.isMouseDown = false;
    });
  }
  createCenterPiece() {
    this.geometry = new THREE.IcosahedronGeometry(1, 2);
    this.geometry.computeFlatVertexNormals();
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        u_displacement: { type: 'f', value: 0 },
        u_should_explode: { type: 'bool', value: true },
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
    const radius = 5;
    let angleZ = 0;
    let angleXY = 0;
    const angleIncrement = utils.toRadians(360 / 200);
    const geometry = new THREE.BufferGeometry();
    let vertices = [];
    for(let i = 0; i < 200; i ++) {
      vertices.push(
        radius * Math.cos(angleZ) * Math.sin(angleXY),
        radius * Math.sin(angleZ) * Math.sin(angleXY),
        radius * Math.cos(angleXY)
      );
      angleZ += angleIncrement;
      angleXY += angleIncrement;
    }
    const positionAttribute = new THREE.BufferAttribute(
      new Float32Array(vertices), 3
    );
    geometry.addAttribute('position', positionAttribute);
    return geometry;
  }
  draw() {
    if(this.isMouseDown) {
      this.displacement = Math.min(1.0, this.displacement + this.displacementInc);
    } else {
      this.displacement = Math.max(0.0, this.displacement - this.displacementInc);
    }

    this.material.uniforms.u_displacement.value = this.displacement;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}
