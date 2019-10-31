import * as THREE from 'three';
import glsl from 'glslify';
import utils from '../utils';

import SketchManagerThree from '../sketchManagerThree';
import { Images } from '../../themes';

import frag from './plane.frag';
import vert from './plane.vert';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.interactRadius = 0.2;
    this.amp = 3.5;
    this.planeNoise = new THREE.Vector3(1, 2, 2);
    this.planeMaterial = {};

    this.raycaster = {};
    this.isMousedown = false;
    this.reveal = 0;
    this.revealIncrement = 0.01;

    this.rotateionSensitivity = 60;
    this.rotationRadius = 80;
    this.rotationRange = {
      minX: -100,
      maxX: 100,
    };
  }
  unmount() {

  }
  init() {
    this.disableOrbitControls();
    this.setClearColor(0xbbbb55);
    this.setCameraPos(0, 0, -this.rotationRadius);
    this.lookAt(0, 0, 0);
    this.raycaster = new THREE.Raycaster();
    this.createMouseListener();

    this.createPlane();

    this.canvas.addEventListener('mousedown', (e) => {
      this.isMousedown = true;
    });
    this.canvas.addEventListener('mouseup', (e) => {
      this.isMousedown = false;
    });

    /**
     * mobile
     */
    this.canvas.addEventListener('touchstart', (e) => {
      this.isMousedown = true;
    });
    this.canvas.addEventListener('touchend', (e) => {
      this.isMousedown = false;
    });
  }
  createPlane() {
    const width = 90;
    const height = 90;
    const segmentRatio = 1.2;
    const geometry = new THREE.PlaneGeometry(
      width,
      height,
      width * segmentRatio,
      height * segmentRatio
    );

    const textureA = THREE.ImageUtils.loadTexture(Images.T012a);
    const textureB = THREE.ImageUtils.loadTexture(Images.T012b);
    this.planeMaterial = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      fragmentShader: glsl(frag),
      vertexShader: glsl(vert),
      shading: THREE.FlatShading,
      uniforms: {
        u_time: { type: 'f', value: 0 },
        u_amp: { type: 'f', value: this.amp },
        u_noise: {type: 'v3', value: this.planeNoise },
        u_texture_a: { type: 't', value: textureA },
        u_texture_b: { type: 't', value: textureB },
        u_mix_value: { type: 'f', value: this.reveal },
      }
    });
    const plane = new THREE.Mesh(geometry, this.planeMaterial);
    this.scene.add(plane);
  }
  offsetCamera() {
    const { minX, maxX } = this.rotationRange;
    const centerCoord = { x: 0, y: 0, z: 0 };
    const degrees = utils.clamp(minX, maxX, this.mouse.x * this.rotateionSensitivity);
    const angle = utils.toRadians(degrees);
    const { x, z } = this.getCircleCoord(centerCoord, this.rotationRadius, angle);
    this.setCameraPos(x, 0, -z);
    this.lookAt(0, 0, 0);
  }
  getCircleCoord(centerCoord, radius, angle) {
    return {
      x: centerCoord.x + radius * Math.sin(angle),
      y: 0,
      z: centerCoord.y + radius * Math.cos(angle),
    }
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    this.offsetCamera();

    this.planeMaterial.uniforms.u_time.value = this.getUTime();
    this.planeMaterial.uniforms.u_amp.value = this.amp;

    if(this.isMousedown && this.reveal < 1) {
      this.reveal += this.revealIncrement;
    }
    if(!this.isMousedown && this.reveal > 0) {
      this.reveal -= this.revealIncrement;
    }
    this.planeMaterial.uniforms.u_mix_value.value = this.reveal;
    
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
