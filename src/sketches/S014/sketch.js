import * as THREE from 'three';
import glsl from 'glslify';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes/themes' 

import * as PP from 'postprocessing';
import Ring from './ring';
import Shape from './shape';

/**
 * https://youtu.be/K7cnJPrOzy4?t=236
 * https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom
 * https://www.shutterstock.com/blog/who-or-what-is-hatsune-miku-the-making-of-a-virtual-pop-star
 * https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
 * https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
 * https://github.com/Jam3/analyser-frequency-average/blob/master/index.js
 * https://youtu.be/w6vzMDKSVvo?t=1528
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.raycaster = {};
    this.audioSrc = Audio.tester;

    this.composer = {};
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.numFrequencyNodes = 15;
    this.fftSize = 512;
    this.vertices = [];

    this.numRings = 10;
    this.rings = [];
    this.shapes = [];
    this.beatOrb = {};

  }
  unmount() {
    this.audio.stop();
  }
  init() {
    this.createStats();

    this.setCameraPos(30, 30, -50);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x100011);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);

    this.createBeatOrb();
    this.createRings();
    this.createShapes();
    this.createEffects();
  }
  createSkybox() {
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({
      // color: 0xffffff,
      color: 0x000000,
      wireframe: true,
    });
    this.skybox = new THREE.Mesh(geometry, material);
    this.skybox.receiveShadow = true;
    this.skybox.position.set(0, 100, 0);

    this.scene.add(this.skybox);
  }
  createEffects() {
    this.composer = new PP.EffectComposer(this.renderer);
    this.renderPass = new PP.RenderPass(this.scene, this.camera, 0x111111);
    
    const bloomPass = new PP.EffectPass(this.camera, new PP.BloomEffect());
    bloomPass.renderToScreen = true;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(bloomPass);
  }
  createBeatOrb() {
    const geometry = new THREE.IcosahedronGeometry(10, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff2222,
      wireframe: true,
    });
    this.beatOrb = new THREE.Mesh(geometry, material);
    const rotation = utils.toRadians(60);
    this.beatOrb.rotation.set(rotation, rotation, rotation);
    this.scene.add(this.beatOrb);
  }
  createRings() {
    const color = 0x00bbff;
    const z = 35;
    for(let i = 0; i < this.numRings; i ++) {
      const radius = utils.randomFloatBetween(5, 35);
      const arc = utils.randomFloatBetween(Math.PI * 0.3, Math.PI * 0.8);
      const rotateZ = utils.toRadians(utils.randomFloatBetween(0, 360));
      const ring = new Ring({
        color,
        tube: 0.7,
        arc,
        radius,
      });
      ring.rotateZ(rotateZ);
      const translateZ = i >= (this.numRings / 2) ? z : -z;
      ring.setPosition(0, 0, translateZ);
      this.scene.add(ring.mesh);
      this.rings.push(ring);
    }
  }
  createShapes() {
    const color = 0xffaa55;
    const centerCoord = { x: 0, y: 0, z: 6 };

    this.audio.frequencyData.forEach(node => {
      const shape = new Shape({
        radius: 2,
        widthSegments: 5,
        heightSegments: 5,
        color,
        centerCoord,
      });
      this.scene.add(shape.mesh);
      this.shapes.push(shape);
    })
  }
  draw() {
    this.stats.begin();

    this.composer.renderer.autoClear = true;

    this.audio.getByteFrequencyData();
    const averageFreq = this.audio.getAverageFrequency();
    this.rings.forEach((ring) => ring.update(averageFreq))

    this.shapes.forEach((shape, index) => {
      const frequency = this.audio.frequencyData[index];
      shape.update(frequency);
    })

    const scale = utils.remap(0, 255, 0.3, 1.1, averageFreq);
    this.beatOrb.scale.set(scale, scale, scale);

    this.composer.render(this.clock.getDelta());
    this.composer.renderer.autoClear = false;

    this.stats.end();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;