import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes'

import * as PP from 'postprocessing';
import Ring from './ring';
import OuterRing from './outerRing';
import Bar from './bar';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.raycaster = {};
    this.audioSrc = Audio.tester;
    // this.audioSrc = Audio.S014;

    this.composer = {};
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.numFrequencyNodes = 15;
    this.fftSize = 512;
    this.vertices = [];

    this.light = {};
    this.numRings = 15;
    this.lastRingRadius = 12;
    this.skybox = {};
    this.rings = [];
    this.outerRing = {};
    this.bars = [];

  }
  unmount() {

  }
  init() {
    this.disableOrbitControls();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.soft = true;

    this.setCameraPos(110, 105, -110);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xffffff);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.volume(0.3);

    this.createLight();
    this.createSkybox();
    this.createRings(0, this.numRings);
    this.createOuterRing();
    this.createBars();

    this.createEffects();
  }
  createLight() {
    this.light = new THREE.SpotLight(0xffffff, 0.5, 1000, 1.05, 0.3, 2);
    this.light.position.set(0, 150, 0);
    this.light.castShadow = true;
    this.scene.add(this.light);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  }
  createEffects() {
    this.composer = new PP.EffectComposer(this.renderer);
    this.renderPass = new PP.RenderPass(this.scene, this.camera,  0x111111);

    const bloomPass = new PP.EffectPass(this.camera, new PP.BloomEffect());
    bloomPass.renderToScreen = true;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(bloomPass);
  }
  createSkybox() {
    const size = 1000;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.skybox = new THREE.Mesh(geometry, material);
    this.skybox.receiveShadow = true;
    this.skybox.position.y = size / 2 - 3;
    this.scene.add(this.skybox);
  }
  createRings(z, length) {
    const color = 0x00bbff;
    const tube = 0.7;
    for(let i = 0; i < length; i ++) {
      const arc = utils.randomFloatBetween(Math.PI * 0.3, Math.PI * 0.8);
      const rotateZ = utils.toRadians(utils.randomFloatBetween(0, 360));
      const radius = this.lastRingRadius;
      const ring = new Ring({ color, tube, arc, radius });
      ring.rotateZ(rotateZ);
      ring.setPosition(0, 0, z);
      this.scene.add(ring.mesh);
      this.rings.push(ring);

      const radiusIncrement = utils.randomFloatBetween(3, 8);
      this.lastRingRadius += radiusIncrement;
    }
  }
  createOuterRing() {
    const radius = this.lastRingRadius + 1.0;
    const config = {
      radius,
      numDivisions: this.numRings,
    };
    this.outerRing = new OuterRing(config);
    this.scene.add(this.outerRing.group);
  }
  createBars() {
    const circleCoord = { x: 0, y: 0, z: 0 };
    const radius = 10;
    let angle = 0;
    const angleIncrement = Math.PI * 2 / (this.numFrequencyNodes - 1)
    this.audio.frequencyData.forEach(node => {
      const { x, y, z } = this.getCircleCoord(circleCoord, radius, angle);
      const bar = new Bar();
      bar.setPosition(x, y, z);
      this.scene.add(bar.mesh);
      this.bars.push(bar);
      angle += angleIncrement;
    })
  }
  getCircleCoord(circleCoord, radius, angle) {
    return {
      x: circleCoord.x + radius * Math.cos(angle),
      y: circleCoord.y,
      z: circleCoord.z + radius * Math.sin(angle)
    }
  }
  draw() {
    this.composer.renderer.autoClear = true;

    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((frequency, index) => {
      this.rings[index].update(frequency);
      this.bars[index].update(frequency);
    })

    const uTime = this.getUTime();
    this.outerRing.update(this.audio.frequencyData, uTime)

    this.composer.render(this.clock.getDelta());
    this.composer.renderer.autoClear = false;

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
